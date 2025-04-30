export interface Message {
  id?: number;
  groupName?: string | null;
  content: string;
  sender: { id: number };
  receiver?: { id: number };
  timestamp?: Date;
}


