import { ReactionType } from './reaction-type.enum';
import { Post } from './post.model';
import { User } from './user.model';

export interface Reaction {
  id: number;
  type: ReactionType;
  creationTime: Date;
  post: Post;       // Reference to full post
  user: User;       // Reference to user
}