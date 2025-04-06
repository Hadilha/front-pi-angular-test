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
  currentUser: any; // Replace with your User type

  constructor(
    private reactionService: ReactionService,
    private userService: UserService
  ) {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  // Add these methods
  hasReaction(type: ReactionType): boolean {
    return this.post.reactions.some(r => 
      r.type === type && r.user.id === this.currentUser?.id
    );
  }

  getReactionEmoji(type: ReactionType): string {
    switch(type) {
      case ReactionType.UPVOTE: return '👍';
      case ReactionType.DOWNVOTE: return '👎';
      case ReactionType.CELEBRATE: return '🎉';
      case ReactionType.HEART: return '❤️';
      case ReactionType.SAD: return '😢';
      case ReactionType.LAUGH: return '😂';
      default: return '❔';
    }
  }

  addReaction(type: ReactionType) {
    this.reactionService.addReaction(this.post, type).subscribe(() => {
      // Update local state or refresh data
    });
  }
}