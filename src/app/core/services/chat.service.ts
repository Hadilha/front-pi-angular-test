import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

export interface Message {
  id?: number;
  groupName?: string | null;
  content: string;
  sender: { id: number };
  receiver?: { id: number };
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private REST_API = 'http://localhost:8089/api';
  private WS_ENDPOINT = 'http://localhost:8089/ws';
  private stompClient: Client | null = null;
  public messageStream$ = new Subject<Message>();
  private groupUpdateSubject = new Subject<void>();
  private subscribedGroups: Set<string> = new Set();

  constructor(private http: HttpClient) {
    console.log('ChatService instantiated');
    this.connect(0);
  }

  connect(senderId: number): void {
    console.log('Attempting to connect with senderId:', senderId);
    if (this.stompClient && this.stompClient.connected) {
      console.log('STOMP client already connected');
      return;
    }

    this.stompClient = new Client({
      webSocketFactory: () => {
        console.log('Creating WebSocket connection to:', this.WS_ENDPOINT);
        return new SockJS(this.WS_ENDPOINT);
      },
      debug: (str) => console.log('STOMP Debug:', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      console.log('STOMP WebSocket connected:', frame);
      this.stompClient!.subscribe('/queue/messages', (message) => {
        console.log('Received private message:', message.body);
        const msg: Message = JSON.parse(message.body);
        this.messageStream$.next(msg);
      });
      this.stompClient!.subscribe('/topic/groups', (message) => {
        console.log('Received group update:', message.body);
        if (message.body === 'refresh') {
          this.groupUpdateSubject.next();
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame);
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('WebSocket error:', error);
    };

    this.stompClient.onWebSocketClose = (event) => {
      console.error('WebSocket closed:', event);
    };

    this.stompClient.activate();
  }

  subscribeToGroup(groupName: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('STOMP client is not connected, cannot subscribe to group:', groupName);
      return;
    }
    if (this.subscribedGroups.has(groupName)) {
      console.log('Already subscribed to group:', groupName);
      return;
    }
    this.stompClient.subscribe(`/topic/group/${groupName}`, (message) => {
      console.log('Received group message:', message.body);
      const msg: Message = JSON.parse(message.body);
      this.messageStream$.next(msg);
    });
    this.subscribedGroups.add(groupName);
  }

  sendMessage(message: Message): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('STOMP client is not connected');
      return;
    }
    if (message.groupName) {
      console.log('Sending message to group /app/group:', message);
      this.stompClient.publish({
        destination: `/app/group/${message.groupName}`,
        body: JSON.stringify(message),
      });
    } else {
      console.log('Sending message to /app/private:', message);
      this.stompClient.publish({
        destination: '/app/private',
        body: JSON.stringify(message),
      });
    }
  }

  getPrivateChatHistory(senderId: number, receiverId: number): Observable<Message[]> {
    const url = `${this.REST_API}/chat/history/private?senderId=${senderId}&receiverId=${receiverId}`;
    console.log('Fetching chat history from:', url);
    return this.http.get<Message[]>(url);
  }

  getGroupChatHistory(groupName: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.REST_API}/chat/history/group?groupName=${groupName}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.REST_API}/users/all`);
  }

  getConversations(userId: number): Observable<number[]> {
    const url = `${this.REST_API}/chat/conversations?userId=${userId}`;
    console.log('Fetching conversations for user:', userId);
    return this.http.get<number[]>(url);
  }

  createGroup(groupName: string): Observable<any> {
    return this.http.post(`${this.REST_API}/chat/group/create?groupName=${groupName}`, {});
  }

  getAllGroups(): Observable<Set<string>> {
    return this.http.get<Set<string>>(`${this.REST_API}/chat/groups`);
  }

  assignUserToGroup(groupName: string, userId: number): Observable<string> {
    const params = new URLSearchParams({
      groupName,
      userId: userId.toString(),
    });
    return this.http.post<string>(`${this.REST_API}/chat/group/assign?${params.toString()}`, {});
  }

  removeUserFromGroup(groupName: string, userId: number): Observable<string> {
    return this.http.post(
      `${this.REST_API}/chat/group/remove?groupName=${groupName}&userId=${userId}`,
      {},
      { responseType: 'text' }
    );
  }

  getGroupMembers(): Observable<Map<string, number[]>> {
    return this.http.get<Map<string, number[]>>(`${this.REST_API}/chat/group/members`);
  }

  deleteGroup(groupName: string): Observable<string> {
    return this.http.post(
      `${this.REST_API}/chat/group/delete?groupName=${groupName}`,
      {},
      { responseType: 'text' }
    );
  }

  analyzeMessage(message: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.REST_API}/chat/analyze`, { message });
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('STOMP WebSocket disconnected');
    }
  }

  getGroupUpdateObservable(): Observable<void> {
    return this.groupUpdateSubject.asObservable();
  }
}