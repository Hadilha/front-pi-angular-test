// comment-list.component.ts
import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];  // Correct input property
  @Input() depth: number = 0;
}