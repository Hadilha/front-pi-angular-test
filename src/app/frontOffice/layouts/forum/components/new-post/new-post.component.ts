// new-post.component.ts
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @Output() postCreated = new EventEmitter<void>();
  newPostContent = '';
  
  @ViewChild('commentInput') commentInput!: ElementRef;

  // Add this method
  focusCommentField() {
    this.commentInput.nativeElement.focus();
  }

  submitPost() {
    if (this.newPostContent.trim()) {
      this.postCreated.emit();
      this.newPostContent = '';
    }
  }
}