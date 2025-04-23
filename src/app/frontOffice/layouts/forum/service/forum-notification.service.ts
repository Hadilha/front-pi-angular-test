import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ForumNotificationService {
  private eventSource: EventSource | null = null;

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  connect(): void {
    this.eventSource = new EventSource(
      'http://localhost:8089/api/notifications/subscribe'
    );

    this.eventSource.addEventListener('notification', (event: any) => {
      try {
        const data = JSON.parse(event.data);
        const user = data.user || 'Someone';
        const type = data.type || 'comment'; // default to 'comment'
        
        let formattedMessage = '';
    
        if (type === 'comment') {
          const postTitle = data.postTitle || 'your post';
          formattedMessage = `🗨️ ${user} has commented on your post: "${postTitle}"`;
        } else if (type === 'report') {
          const targetType = data.targetType || 'Post'; // "Post" or "Comment"
          const postTitle = data.postTitle ? `: "${data.postTitle}"` : '';
          formattedMessage = `🚩 ${user} has reported a ${targetType}${postTitle}`;
        }
    
        this.zone.run(() => {
          this.snackBar.open(formattedMessage, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar'],
          });
        });
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    });
    

    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.eventSource?.close();
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
