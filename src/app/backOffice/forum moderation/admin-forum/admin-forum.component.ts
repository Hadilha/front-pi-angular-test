import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminPostViewModalComponent } from '../admin-post-view-modal/admin-post-view-modal.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.css'],
})
export class AdminForumComponent {
  constructor(private dialog: MatDialog) {}

  posts = [
    {
      id: 1,
      title: 'Welcome to the forum!',
      author: 'admin',
      date: new Date(),
      status: 'published',
      comments: [
        { id: 101, author: 'userA', content: 'Thanks for the welcome!', date: new Date() },
        { id: 102, author: 'userB', content: 'Glad to be here!', date: new Date() },
      ]
    },
    {
      id: 2,
      title: 'Pending review: Post about Angular',
      author: 'user123',
      date: new Date(),
      status: 'pending',
      comments: []
    }
  ];
  

  viewPost(post: any) {
    this.dialog.open(AdminPostViewModalComponent, {
      panelClass: 'centered-modal',
      data: post,
      disableClose: false,
    });
  }

  deletePost(post: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { title: post.title }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.posts = this.posts.filter(p => p.id !== post.id);
      }
    });
  }
}
