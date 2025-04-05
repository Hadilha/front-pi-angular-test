// services/reaction.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reaction } from '../models/reaction.model';
import { ReactionType } from '../models/reaction-type.enum';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class ReactionService {
  private reactions: Reaction[] = [];
  private currentUser: User = { id: 1, username: 'Current User' };

  addReaction(post: Post, type: ReactionType): Observable<Reaction> {
    const existingReaction = this.reactions.find(r => 
      r.post.id === post.id && r.user.id === this.currentUser.id
    );

    if (existingReaction) {
      // Update existing reaction
      existingReaction.type = type;
      return of({...existingReaction});
    } else {
      const newReaction: Reaction = {
        id: this.generateReactionId(),
        type,
        post,
        user: this.currentUser,
        creationTime: new Date()
      };
      this.reactions.push(newReaction);
      return of({...newReaction});
    }
  }

  getReactionsByPost(postId: number): Observable<Reaction[]> {
    return of(this.reactions.filter(r => r.post.id === postId));
  }

  private generateReactionId(): number {
    return this.reactions.length > 0 
      ? Math.max(...this.reactions.map(r => r.id)) + 1 
      : 1;
  }
}