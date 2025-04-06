import { Reaction } from '../models/reaction.model';
import { ReactionType } from '../models/reaction-type.enum';
import { MOCK_USERS } from './mock-user'; 
import { MOCK_POSTS } from './mock-posts';

export const MOCK_REACTIONS: Reaction[] = [
  {
    id: 1,
    type: ReactionType.UPVOTE,
    creationTime: new Date('2024-03-15T11:05:00'),
    post: MOCK_POSTS[0],
    user: MOCK_USERS[1]
  },
  {
    id: 2,
    type: ReactionType.HEART,
    creationTime: new Date('2024-03-15T11:10:00'),
    post: MOCK_POSTS[0],
    user: MOCK_USERS[2]
  }
];