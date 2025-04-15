import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post/post.model'; 
import { Comment } from '../models/comment/comment.model'; 

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = 'http://localhost:8089/forum';

  constructor(private http: HttpClient) {}

  // Fetch posts by category
  getPosts(category: string): Observable<Post[]> {
    let url = `${this.apiUrl}/posts`;
    if (category !== 'All') {
      url += `?tag=${category}`;
    }
    return this.http.get<Post[]>(url);
  }

  // Fetch comments for a post
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/byPost/${postId}`);
  }

  // Fetch reactions for a post
  getReactions(postId: number): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${this.apiUrl}/posts/${postId}/reactions`
    );
  }

  // Create post
  createPost(postPayload: any): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, postPayload);
  }

  // Create comment
  createComment(postId: number, comment: any): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/comments?postId=${postId}`,
      comment
    );
  }

  // Delete post
  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}`);
  }

  // Delete comment
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }
}
