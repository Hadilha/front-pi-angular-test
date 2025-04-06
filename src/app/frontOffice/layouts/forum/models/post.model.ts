import { Comment } from './comment.model';
import { Reaction } from './reaction.model';
import { User } from './user.model';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  creationTime: Date;
  comments: Comment[];
  reactions: Reaction[];
  tags: string[];       // Optional for categorization
  pinned?: boolean;      // For important posts
  views?: number;        // For popularity tracking
}