export interface Message {
  id?: number;
  groupName?: string | null;
  content: string;
  senderId: number;
  receiverId: number;
  timestamp?: Date;
}