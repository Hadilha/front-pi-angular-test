import { ForumNotificationService } from 'src/app/Services/forum-notification/forum-notification.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReportDetailModalComponentComponent } from 'src/app/backOffice/components/forum/report-detail-modal-component/report-detail-modal-component.component';
import { ConfirmDeleteDialogComponent } from 'src/app/backOffice/components/forum/confirm-delete-dialog/confirm-delete-dialog.component';
import { AdminPostViewModalComponent } from 'src/app/backOffice/components/forum/admin-post-view-modal/admin-post-view-modal.component';

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(10px)' })
        ),
      ]),
    ]),
  ],
})
export class AdminForumComponent implements OnInit {
  private reportSubscription!: Subscription;
  posts: any[] = [];
  private readonly BASE_URL = 'http://localhost:8089/forum/posts'; // Update if needed

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private notificationService: ForumNotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadReports();
    this.reportSubscription =
      this.notificationService.reportNotifications$.subscribe((message) => {
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['admin-snackbar'],
        });
      });
  }

  loadPosts(): void {
    this.http.get<any[]>(this.BASE_URL).subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Failed to load posts:', err),
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
      },
    });
  }

  deletePost(post: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { title: post.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.http.delete(`${this.BASE_URL}/${post.id}`).subscribe({
          next: () => {
            this.posts = this.posts.filter((p) => p.id !== post.id);
          },
          error: (err) => console.error('Failed to delete post:', err),
        });
      }
    });
  }

  getCommentsForPost(postId: number) {
    return this.http.get<Comment[]>(
      `http://localhost:8089/forum/comments/byPost/${postId}`
    );
  }
  reports: any[] = [];

  loadReports(): void {
    this.http.get<any[]>('http://localhost:8089/forum/reports').subscribe({
      next: (data) => (this.reports = data),
      error: (err) => console.error('Failed to load reports:', err),
    });
  }

  deleteReportedContent(report: any): void {
    if (report.post) {
      this.http
        .delete(`http://localhost:8089/forum/posts/${report.post.id}`)
        .subscribe({
          next: () => {
            this.posts = this.posts.filter((p) => p.id !== report.post.id);
            this.reports = this.reports.filter((r) => r !== report);
            alert('🗑 Post deleted successfully!');
          },
          error: (err) => console.error('❌ Failed to delete post:', err),
        });
    } else if (report.comment) {
      this.http
        .delete(`http://localhost:8089/forum/comments/${report.comment.id}`)
        .subscribe({
          next: () => {
            this.reports = this.reports.filter((r) => r !== report);
            alert('🗑 Comment deleted successfully!');
          },
          error: (err) => console.error('❌ Failed to delete comment:', err),
        });
    }
  }

  markAsReviewed(report: any): void {
    this.reports = this.reports.filter((r) => r !== report);
    alert('✅ Report marked as reviewed.');
  }

  viewReport(report: any) {
    console.log('Opening Report Modal with report:', report); // Debugging line
    this.dialog.open(ReportDetailModalComponentComponent, {
      width: '600px',
      data: report,
    });
  }

  currentPage: number = 1;
  pageSize: number = 5;

  get paginatedReports() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.reports.slice(start, start + this.pageSize);
  }

  goToNextPage() {
    if (this.currentPage * this.pageSize < this.reports.length) {
      this.currentPage++;
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  animate = true;
  openReportModal(report: any): void {
    const dialogRef = this.dialog.open(ReportDetailModalComponentComponent, {
      width: '500px',
      data: report, // pass selected report to the modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Modal closed with result:', result);
      }
    });
  }
}
