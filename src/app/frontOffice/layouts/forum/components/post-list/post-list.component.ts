// post-list.component.ts
import { Component, Input, ViewChild } from '@angular/core';
import { Post } from '../../models/post.model';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  selectedPostId: number | null = null;
  
  @ViewChild(NewPostComponent) newPostComponent!: NewPostComponent;

  // Add this method
  focusCommentInput() {
    if (this.newPostComponent) {
      this.newPostComponent.focusCommentField();
    }
  }

  toggleComments(postId: number) {
    this.selectedPostId = this.selectedPostId === postId ? null : postId;
  }
}