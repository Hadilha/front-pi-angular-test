// services/forum.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
  tag: string;
  author: {
    id: number;
    name: string;
    avatar?: string; // Optional if not always present
  };
  createdAt: string;
  comments: any[];
  reactions: { [key: string]: number };
  avatar?: string; // This might be used if avatar is directly under post
  totalReplies?: number;
  totalReactions?: number;
  viewCount?: number;
}


@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = 'http://localhost:8089/forum';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getTopPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/top-posts`);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${postId}`);
  }

  getUserReaction(postId: number, username: string): Observable<string> {
    return this.http.get<string>(
      `${this.apiUrl}/posts/${postId}/reactions/user-reaction?username=${username}`
    );
  }
}
