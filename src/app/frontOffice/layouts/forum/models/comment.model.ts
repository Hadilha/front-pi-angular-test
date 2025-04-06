import { User } from './user.model';

// comment.model.ts
export interface Comment {
    id: number;
    content: string;
    creationTime: Date;
    author: User;
    postId: number;
    parentCommentId?: number;  // Add this property
    depth?: number;
    replies?: Comment[];
}