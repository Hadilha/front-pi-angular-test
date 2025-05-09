// Update the PostFormService:
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Post {
  id: number;
  title: string;
  content: string;
  tag: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
  replies: number;
  likes: number;
  comments: any[];
  reactions: { [key: string]: number };
}

// Add a CreatePost interface for the payload
export interface CreatePost {
  title: string;
  content: string;
  tag: string;
  author: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostFormService {
  //private apiUrl = 'http://localhost:8089/forum';
  private readonly apiUrl = `${environment.apiUrl}/forum`;
  private readonly aiUrl = `${environment.apiUrl}`;


  constructor(private http: HttpClient) {}

  generatePostContent(prompt: string): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(`${this.aiUrl}/ai/generate-post`, { prompt });
  }

  // Use CreatePost interface for the payload type
  createPost(postPayload: CreatePost): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, postPayload);
  }

}
