import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, Message } from 'src/app/core/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  senderId = 1; // Example: Hardcoded for now, should be dynamic based on logged-in user
  receiverId: number | null = null; // For private chats
  activeGroup: string | null = null; // For group chats
  conversations: number[] = []; // Private conversations
  groups: string[] = []; // Groups the user is part of
  groupMembers: Map<string, number[]> = new Map(); // Group membership data
  users: any[] = []; // Store user data
  private messageSub!: Subscription;
  isChatOpen: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadConversations();
    this.loadGroups();
    this.listenForIncomingMessages();
    this.chatService.connect(this.senderId);
  }

  loadUsers(): void {
    this.chatService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Loaded users:', this.users);
      },
      error: (err) => console.error('Failed to load users', err),
    });
  }

  loadConversations(): void {
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
    this.chatService.getGroupMembers().subscribe({
      next: (members) => {
        this.groupMembers = new Map(Object.entries(members));
        console.log('Loaded group members:', this.groupMembers);
        // Subscribe to groups the user is part of
        this.groups.forEach(group => {
          const members = this.groupMembers.get(group) || [];
          if (members.includes(this.senderId)) {
            this.chatService.subscribeToGroup(group);
          }
        });
        // Select the first group the user is part of if no chat is active
        if (!this.receiverId && !this.activeGroup) {
          const firstGroup = this.groups.find(group => {
            const members = this.groupMembers.get(group) || [];
            return members.includes(this.senderId);
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
    this.receiverId = -1; // Special ID for the Support Bot
    this.activeGroup = null;
    this.messages = []; // Clear chat history for bot
  }

  loadChatHistory(): void {
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
    this.messageSub = this.chatService.messageStream$.subscribe((msg: Message) => {
      // Handle private messages
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
      // Handle group messages
      if (msg.groupName && msg.groupName === this.activeGroup) {
        this.messages.push(msg);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const msg: Message = {
      content: this.newMessage,
      sender: { id: this.senderId },
      timestamp: new Date(),
    };

    // Handle Support Bot messages
    if (this.receiverId === -1) {
      this.messages.push(msg); // Add user message to chat
      this.chatService.analyzeMessage(this.newMessage).subscribe({
        next: (response) => {
          const botMsg: Message = {
            content: response.response,
            sender: { id: -1 },
            receiver: { id: this.senderId },
            timestamp: new Date(),
          };
          this.messages.push(botMsg); // Add bot response to chat
        },
        error: (err) => console.error('Failed to get bot response', err),
      });
    } else {
      // Handle regular private or group messages
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
    if (this.isChatOpen && this.conversations.length > 0 && !this.receiverId && !this.activeGroup) {
      this.selectPrivateChat(this.conversations[0]);
    } else if (this.isChatOpen && !this.receiverId && !this.activeGroup) {
      const firstGroup = this.groups.find(group => {
        const members = this.groupMembers.get(group) || [];
        return members.includes(this.senderId);
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