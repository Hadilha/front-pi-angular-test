import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-admin-post-view-modal',
  templateUrl: './admin-post-view-modal.component.html',
  styleUrls: ['./admin-post-view-modal.component.css']
})
export class AdminPostViewModalComponent {

  isModalOpen: boolean = true;
  private readonly COMMENT_URL = 'http://localhost:8080/api/comments';

  data: {
    title: string;
    author: string;
    status: string;
    date: string;
    content: string;
    comments: Comment[];
  } = {
    title: '',
    author: '',
    status: 'pending',
    date: '',
    content: '',
    comments: []
  };
  
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AdminPostViewModalComponent>
  ) {
    this.data = {
      ...injectedData,
      comments: injectedData.comments || []
    };
  }

  close() {
    this.dialogRef.close(); // Fully closes the modal
  }

  deleteComment(commentId: number) {
    this.http.delete(`${this.COMMENT_URL}/${commentId}`).subscribe({
      next: () => {
        this.data.comments = this.data.comments.filter((c: Comment) => c.id !== commentId);
      },
      error: err => {
        console.error('Failed to delete comment:', err);
      }
    });
  }

  blockComment(commentId: number) {
    const blockedMessage = '[This comment has been blocked by an admin]';

    this.http.put(`${this.COMMENT_URL}/${commentId}`, { content: blockedMessage }).subscribe({
      next: () => {
        const comment = this.data.comments.find((c: Comment) => c.id === commentId);
        if (comment) {
          comment.content = blockedMessage;
        }
      },
      error: err => {
        console.error('Failed to block comment:', err);
      }
    });
  }
}
