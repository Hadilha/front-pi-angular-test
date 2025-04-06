// mock-posts.ts
import { Post } from '../models/post.model';
import { MOCK_USERS } from './mock-user';

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'What is the future of AI?',
    content: 'Discussion about AI advancements',
    author: MOCK_USERS[0],
    creationTime: new Date('2023-10-10'),
    comments: [],
    reactions: [],
    tags: ['AI', 'Technology']  // Added tags
  },
  {
    id: 2,
    title: 'Remote Work Productivity Tips',
    content: 'Sharing best practices for maintaining efficiency...',
    author: MOCK_USERS[1],
    creationTime: new Date('2023-10-11'),
    comments: [],
    reactions: [],
    tags: ['Work', 'Productivity']  // Added tags
  }
];