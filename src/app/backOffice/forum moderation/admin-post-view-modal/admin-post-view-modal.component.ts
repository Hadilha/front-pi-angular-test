import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: Date;
}

interface PostData {
  title: string;
  author: string;
  date: Date;
  status: 'published' | 'pending' | 'deleted';
  content: string;
  comments: Comment[];
}


@Component({
  selector: 'app-admin-post-view-modal',
  templateUrl: './admin-post-view-modal.component.html',
  styleUrls: ['./admin-post-view-modal.component.css']
})

export class AdminPostViewModalComponent {
  isModalOpen: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AdminPostViewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostData
  ) {}

  close() {
    this.isModalOpen = false;
  }

  deleteComment(commentId: number) {
    this.data.comments = this.data.comments.filter((c: Comment) => c.id !== commentId);
  }

  blockComment(commentId: number) {
    const comment = this.data.comments.find((c: Comment) => c.id === commentId);
    if (comment) {
      comment.content = '[This comment has been blocked by an admin]';
    }
  }
}

