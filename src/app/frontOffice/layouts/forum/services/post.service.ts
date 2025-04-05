// services/post.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model'; 
import { Reaction } from '../models/reaction.model';
import { ReactionType } from '../models/reaction-type.enum';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>(this.posts);
  private currentUser: User = { id: 1, username: 'Current User' };

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.posts = [
      {
        id: 1,
        title: 'What is the future of AI?',
        content: 'Discussion about AI advancements',
        author: this.currentUser,
        creationTime: new Date('2023-10-10'),
        comments: [],
        reactions: []
      },
      // Add more mock posts
    ];
    this.postsSubject.next(this.posts);
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  createPost(postData: { title: string; content: string }): Observable<Post> {
    const newPost: Post = {
      id: this.generatePostId(),
      ...postData,
      author: this.currentUser,
      creationTime: new Date(),
      comments: [],
      reactions: []
    };
    this.posts = [newPost, ...this.posts];
    this.postsSubject.next(this.posts);
    return of(newPost);
  }

  private generatePostId(): number {
    return Math.max(...this.posts.map(p => p.id)) + 1;
  }
}