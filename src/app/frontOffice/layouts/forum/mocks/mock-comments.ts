import { Comment } from '../models/comment.model';
import { MOCK_USERS } from './mock-user'; 
import { MOCK_POSTS } from './mock-posts';

export const MOCK_COMMENTS: Comment[] = [
    {
        id: 1,
        content: 'AI will revolutionize diagnostics!',
        creationTime: new Date('2024-03-15T11:00:00'),
        author: MOCK_USERS[1],
        postId: 1,
        replies: [
          {
            id: 3,
            content: 'I completely agree!',
            creationTime: new Date('2024-03-15T11:05:00'),
            author: MOCK_USERS[2],
            postId: 1,
            parentCommentId: 1,
            depth: 1
          }
        ]
      }
];