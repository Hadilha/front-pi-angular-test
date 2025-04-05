import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments: Comment[] = [];
  private currentUser: User = { id: 1, username: 'Current User' };

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return of(this.comments.filter(c => c.postId === postId));
  }

  addComment(postId: number, content: string): Observable<Comment> {
    const newComment: Comment = {
      id: this.generateCommentId(),
      content,
      postId,
      author: this.currentUser,
      creationTime: new Date()
    };
    this.comments.push(newComment);
    return of(newComment);
  }

  private generateCommentId(): number {
    return this.comments.length > 0 
      ? Math.max(...this.comments.map(c => c.id)) + 1 
      : 1;
  }
}