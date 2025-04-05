import { User } from './user.model';

export interface Comment {
  id: number;
  content: string;
  creationTime: Date;
  author: User;
  postId: number;
  parentCommentId?: number;  // For nested comments
  edited?: boolean;          // Track edits
}