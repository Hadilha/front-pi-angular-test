import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminPostViewModalComponent } from '../admin-post-view-modal/admin-post-view-modal.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.css'],
})
export class AdminForumComponent implements OnInit {
  posts: any[] = [];
  private readonly BASE_URL = 'http://localhost:8089/forum/posts'; // Update if needed

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.http.get<any[]>(this.BASE_URL).subscribe({
      next: data => this.posts = data,
      error: err => console.error('Failed to load posts:', err)
    });
  }

  viewPost(post: any): void {
    this.getCommentsForPost(post.id).subscribe({
      next: (comments) => {
        this.dialog.open(AdminPostViewModalComponent, {
          panelClass: 'centered-modal',
          data: { ...post, comments }, // 👈 inject comments with post
          disableClose: false,
        });
      },
      error: (err) => {
        console.error('Failed to load comments:', err);
        this.dialog.open(AdminPostViewModalComponent, {
          panelClass: 'centered-modal',
          data: { ...post, comments: [] }, // fallback
          disableClose: false,
        });
      }
    });
  }
  

  deletePost(post: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { title: post.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.http.delete(`${this.BASE_URL}/${post.id}`).subscribe({
          next: () => {
            this.posts = this.posts.filter(p => p.id !== post.id);
          },
          error: err => console.error('Failed to delete post:', err)
        });
      }
    });   
  }


  getCommentsForPost(postId: number) {
    return this.http.get<Comment[]>(`http://localhost:8089/forum/comments/byPost/${postId}`);
  }
  
  
}
