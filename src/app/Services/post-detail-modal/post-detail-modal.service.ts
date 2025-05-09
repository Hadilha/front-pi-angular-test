import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostDetailModalService {

  //private apiUrl = 'http://localhost:8089/forum';
  private readonly apiUrl = `${environment.url}/forum`;


  constructor(private http: HttpClient) {}

  getPostDetails(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${postId}`);
  }

  updatePost(post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${post.id}`, post);
  }

  addReaction(postId: number, reaction: any, username: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/posts/${postId}/reactions?username=${username}`,
      reaction
    );
  }

  removeReaction(postId: number, type: string, username: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/posts/${postId}/reactions?username=${username}&type=${type}`
    );
  }

  incrementViewCount(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${postId}/view`);
  }

  addComment(postId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments?postId=${postId}`, comment);
  }

  updateComment(commentId: number, comment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/comments/${commentId}`, comment);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/comments/${commentId}`);
  }

  submitReport(targetId: number, targetType: string, reason: string): Observable<any> {
    let url = '';
    if (targetType === 'post') {
      url = `${this.apiUrl}/reports/post/${targetId}`;
    } else if (targetType === 'comment') {
      url = `${this.apiUrl}/reports/comment/${targetId}`;
    }
    return this.http.post(url, null, { params: { reason } });
  }

  hasReacted(currentUserReaction: string, type: string): boolean {
    return currentUserReaction === type;
  }

  getReactionEmoji(type: string): string {
    const map: { [key: string]: string } = {
      UPVOTE: '👍',
      DOWNVOTE: '👎',
      HEART: '❤️',
      SAD: '😢',
      LAUGH: '😂',
      CELEBRATE: '🎉',
    };
    return map[type] || '❓';
  }

  getReactionCount(selectedPost: any, type: string): number {
    return selectedPost?.reactions?.[type] || 0;
  }
}
