// forum-space.component.ts
import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-forum-space',
  templateUrl: './forum-space.component.html'
})
export class ForumSpaceComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  refreshPosts() {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }
}