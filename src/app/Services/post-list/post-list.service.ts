import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../forum-space/forum-space.service'; 

@Injectable({
  providedIn: 'root',
})
export class PostListService {
  private apiUrl = 'http://localhost:8089/forum';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostDetails(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`);
  }

  getCommentsForPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comments/byPost/${postId}`);
  }

  getReactionsForPost(postId: number): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${this.apiUrl}/posts/${postId}/reactions`
    );
  }

  getUserReactionForPost(postId: number, username: string): Observable<string> {
    return this.http.get<string>(
      `${this.apiUrl}/posts/${postId}/reactions/user-reaction?username=${username}`
    );
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}`);
  }

  reportPost(postId: number, reason: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/reports/post/${postId}?reason=${encodeURIComponent(
        reason
      )}`,
      {}
    );
  }
}
