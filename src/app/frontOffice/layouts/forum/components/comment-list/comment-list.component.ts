// comment-list.component.ts
import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent {
  @Input() post!: Post;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnChanges() {
    if (this.post) {
      this.commentService.getCommentsByPostId(this.post.id)
        .subscribe(comments => this.comments = comments);
    }
  }
}