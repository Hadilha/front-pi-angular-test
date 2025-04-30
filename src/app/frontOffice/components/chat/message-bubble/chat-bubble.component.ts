import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Import Router for redirection
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { UserService } from 'src/app/Services/user/user.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  senderId: number | null = null; // Initialize as null, will be set dynamically
  receiverId: number | null = null;
  activeGroup: string | null = null;
  conversations: number[] = [];
  groups: string[] = [];
  groupMembers: Map<string, number[]> = new Map();
  users: any[] = [];
  private messageSub!: Subscription;
  isChatOpen: boolean = false;

  constructor(
    private chatService: ChatService,
    private userService: UserService, // Inject UserService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.userService.isLoggedIn()) {
      console.warn('User not logged in, redirecting to login page');
      this.router.navigate(['/auth/login']);
      return;
    }

    // Fetch the senderId from UserService
    this.senderId = this.userService.getCurrentUserId();
    console.log("senderId",this.senderId);

    if (this.senderId === null) {
      console.error('Failed to retrieve senderId, redirecting to login page');
      this.router.navigate(['/auth/login']);
      return;
    }

    console.log('Logged-in user ID:', this.senderId);

    // Initialize chat functionality
    this.loadUsers();
    this.loadConversations();
    this.loadGroups();
    this.listenForIncomingMessages();
    this.chatService.connect(this.senderId); // Connect WebSocket with dynamic senderId
  }

  loadUsers(): void {
    this.chatService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Loaded users******:', this.users);
      },
      error: (err) => console.error('Failed to load users', err),
    });
  }

  loadConversations(): void {
    if (this.senderId === null) return; // Guard against null senderId
    this.chatService.getConversations(this.senderId).subscribe({
      next: (userIds) => {
        this.conversations = userIds.filter(id => id !== this.senderId);
        if (this.conversations.length > 0 && !this.receiverId && !this.activeGroup) {
          this.selectPrivateChat(this.conversations[0]);
        }
      },
      error: (err) => console.error('Failed to load conversations', err),
    });
  }

  loadGroups(): void {
    this.chatService.getAllGroups().subscribe({
      next: (groups) => {
        this.groups = Array.from(groups);
        console.log('Loaded groups:', this.groups);
        this.loadGroupMembers();
      },
      error: (err) => console.error('Failed to load groups', err),
    });
  }

  loadGroupMembers(): void {
    if (this.senderId === null) return; // Guard against null senderId
    this.chatService.getGroupMembers().subscribe({
      next: (members) => {
        this.groupMembers = new Map(Object.entries(members));
        console.log('Loaded group members:', this.groupMembers);
        this.groups.forEach(group => {
          const members = this.groupMembers.get(group) || [];
          if (members.includes(this.senderId!)) { // Use non-null assertion since we checked earlier
            this.chatService.subscribeToGroup(group);
          }
        });
        if (!this.receiverId && !this.activeGroup) {
          const firstGroup = this.groups.find(group => {
            const members = this.groupMembers.get(group) || [];
            return members.includes(this.senderId!);
          });
          if (firstGroup) {
            this.selectGroupChat(firstGroup);
          }
        }
      },
      error: (err) => console.error('Failed to load group members', err),
    });
  }

  selectPrivateChat(userId: number): void {
    this.receiverId = userId;
    this.activeGroup = null;
    this.loadChatHistory();
  }

  selectGroupChat(groupName: string): void {
    this.activeGroup = groupName;
    this.receiverId = null;
    this.chatService.subscribeToGroup(groupName);
    this.loadChatHistory();
  }

  selectSupportBot(): void {
    this.receiverId = -1;
    this.activeGroup = null;
    this.messages = [];
  }

  loadChatHistory(): void {
    if (this.senderId === null) return; // Guard against null senderId
    if (this.activeGroup) {
      this.chatService.getGroupChatHistory(this.activeGroup).subscribe({
        next: (msgs) => (this.messages = msgs),
        error: (err) => console.error('Failed to load group chat history', err),
      });
    } else if (this.receiverId && this.receiverId !== -1) {
      this.chatService.getPrivateChatHistory(this.senderId, this.receiverId).subscribe({
        next: (msgs) => (this.messages = msgs),
        error: (err) => console.error('Failed to load private chat history', err),
      });
    }
  }

  listenForIncomingMessages(): void {
    if (this.senderId === null) return; // Guard against null senderId
    this.messageSub = this.chatService.messageStream$.subscribe((msg: Message) => {
      if (!msg.groupName && this.receiverId) {
        if (
          (msg.sender?.id === this.senderId && msg.receiver?.id === this.receiverId) ||
          (msg.sender?.id === this.receiverId && msg.sender?.id !== -1 && msg.receiver?.id === this.senderId)
        ) {
          this.messages.push(msg);
        }
        if (msg.sender?.id !== this.senderId && !this.conversations.includes(msg.sender.id)) {
          this.conversations.push(msg.sender.id);
        }
      }
      if (msg.groupName && msg.groupName === this.activeGroup) {
        this.messages.push(msg);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || this.senderId === null) return; // Guard against null senderId

    const msg: Message = {
      content: this.newMessage,
      sender: { id: this.senderId },
      timestamp: new Date(),
    };

    if (this.receiverId === -1) {
      this.messages.push(msg);
      this.chatService.analyzeMessage(this.newMessage).subscribe({
        next: (response) => {
          const botMsg: Message = {
            content: response.response,
            sender: { id: -1 },
            receiver: { id: this.senderId! }, // Non-null assertion
            timestamp: new Date(),
          };
          this.messages.push(botMsg);
        },
        error: (err) => console.error('Failed to get bot response', err),
      });
    } else {
      if (this.activeGroup) {
        msg.groupName = this.activeGroup;
      } else if (this.receiverId) {
        msg.receiver = { id: this.receiverId };
        msg.groupName = null;
      } else {
        return;
      }

      this.chatService.sendMessage(msg);
      this.messages.push(msg);

      if (this.receiverId && !this.conversations.includes(this.receiverId)) {
        this.conversations.push(this.receiverId);
      }
    }

    this.newMessage = '';
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.senderId === null) return; // Guard against null senderId
    if (this.isChatOpen && this.conversations.length > 0 && !this.receiverId && !this.activeGroup) {
      this.selectPrivateChat(this.conversations[0]);
    } else if (this.isChatOpen && !this.receiverId && !this.activeGroup) {
      const firstGroup = this.groups.find(group => {
        const members = this.groupMembers.get(group) || [];
        return members.includes(this.senderId!); // Non-null assertion
      });
      if (firstGroup) {
        this.selectGroupChat(firstGroup);
      }
    }
  }

  getUsername(userId: number): string {
    if (userId === -1) {
      return 'Support Bot';
    }
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : `User ${userId}`;
  }

  getGroupMemberNames(group: string): string {
    const memberIds = this.groupMembers.get(group) || [];
    if (memberIds.length === 0) {
      return 'No members';
    }
    return memberIds.map(id => this.getUsername(id)).join(', ');
  }

  ngOnDestroy(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
    this.chatService.disconnect();
  }
}
