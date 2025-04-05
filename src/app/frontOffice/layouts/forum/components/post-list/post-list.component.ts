// post-list.component.ts
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  selectedPostId: number | null = null;

  constructor(private postService: PostService) {}

  toggleComments(postId: number) {
    this.selectedPostId = this.selectedPostId === postId ? null : postId;
  }
}