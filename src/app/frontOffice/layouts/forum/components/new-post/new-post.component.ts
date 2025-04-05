// new-post.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent {
  @Output() postCreated = new EventEmitter<void>();
  newPostContent = '';

  constructor(private postService: PostService) {}

  // new-post.component.ts
submitPost() {
  if (this.newPostContent.trim()) {
    // Remove author from object
    this.postService.createPost({
      title: this.newPostContent,
      content: this.newPostContent
    }).subscribe(() => {
      this.postCreated.emit();
      this.newPostContent = '';
    });
  }
}
}