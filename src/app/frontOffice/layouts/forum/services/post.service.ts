// services/post.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { INITIAL_DATA } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>(this.posts);
  private currentUser: User = { id: 1, username: 'Current User' };

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Use spread operator to maintain references
    this.posts = [...INITIAL_DATA.posts.map(post => ({
      ...post,
      author: this.currentUser,
      tags: post.tags || [] // Ensure tags exist
    }))];
    
    this.postsSubject.next(this.posts);
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  createPost(postData: { title: string; content: string; tags?: string[] }): Observable<Post> {
    const newPost: Post = {
      id: this.generatePostId(),
      ...postData,
      author: this.currentUser,
      creationTime: new Date(),
      comments: [],
      reactions: [],
      tags: postData.tags || [] // Add tags with default value
    };
    
    this.posts = [newPost, ...this.posts];
    this.postsSubject.next(this.posts);
    return of(newPost);
  }

  private generatePostId(): number {
    return this.posts.length > 0 
      ? Math.max(...this.posts.map(p => p.id)) + 1 
      : 1;
  }
}