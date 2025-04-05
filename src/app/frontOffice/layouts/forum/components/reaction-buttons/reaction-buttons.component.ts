// reaction-buttons.component.ts
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { ReactionService } from '../../services/reaction.service';
import { ReactionType } from '../../models/reaction-type.enum';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reaction-buttons',
  templateUrl: './reaction-buttons.component.html'
})
export class ReactionButtonsComponent {
  @Input() post!: Post;
  reactionTypes = Object.values(ReactionType);

  constructor(
    private reactionService: ReactionService,
    private userService: UserService
  ) {}

  getReactionCount(type: ReactionType): number {
    return this.post.reactions.filter(r => r.type === type).length;
  }

  addReaction(type: ReactionType) {
    this.userService.getCurrentUser().subscribe(user => {
      const existingReaction = this.post.reactions.find(r => 
        r.type === type && r.user.id === user.id
      );

      if (existingReaction) {
        // Remove existing reaction
        this.post.reactions = this.post.reactions.filter(r => r !== existingReaction);
      } else {
        // Add new reaction
        const newReaction = {
          id: this.generateTempId(),
          type,
          creationTime: new Date(),
          post: this.post,
          user
        };
        this.post.reactions.push(newReaction);
      }
    });
  }

  private generateTempId(): number {
    return Math.floor(Math.random() * 1000000); // Temporary ID for mock data
  }
}