import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForumNotificationService {
  private eventSource: EventSource | null = null;
  private reportNotificationSubject = new Subject<string>();

  private readonly apiUrl = `${environment.apiUrl}`;

  // Observable for report notifications
  public reportNotifications$ = this.reportNotificationSubject.asObservable();

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  connect(): void {
    if (this.eventSource) return;

    //this.eventSource = new EventSource('http://localhost:8089/api/');
    this.eventSource = new EventSource(`${this.apiUrl}/notifications/subscribe`);


    this.eventSource.addEventListener('notification', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const user = data.user || 'Someone';
        const type = data.type || 'comment';

        // Handle comment notifications globally
        if (type === 'comment') {
          const postTitle = data.postTitle || 'your post';
          const message = `🗨️ ${user} has commented on your post: "${postTitle}"`;

          this.zone.run(() => {
            this.snackBar.open(message, 'Close', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          });
        }
        // Handle report notifications via observable
        else if (type === 'report') {
          const targetType = data.targetType || 'Post';
          const postTitle = data.postTitle ? `: "${data.postTitle}"` : '';
          const message = `🚩 ${user} has reported a ${targetType}${postTitle}`;

          this.zone.run(() => {
            this.reportNotificationSubject.next(message);
          });
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    });

    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.disconnect();
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
