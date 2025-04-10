// forum-space.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-space',
  templateUrl: './forum-space.component.html',
  styleUrls: ['./forum-space.component.css'],
})

export class ForumSpaceComponent implements OnInit {
  constructor(private http: HttpClient) {
    console.log('✅ ForumSpaceComponent constructor');
  }

  posts: any[] = [];
  selectedPost: any = null;
  currentUser: string = 'John Doe';
  commentBeingEdited: any = null;
  commentEditContent: string = '';

  newPost = {
    title: '',
    content: '',
  };

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/posts').subscribe({
      next: (data) => {
        this.posts = data.map(post => ({
          ...post,
          comments: post.comments || [],
          reactions: post.reactions || {}
        }));
      },
      error: (err) => {
        console.error('Failed to load posts', err);
        // Optionally show fallback posts:
        // this.posts = [...mockData]
      }
    });
  }

  //* POST CRUD methods
  getPosts() {
    this.http
      .get<any[]>('http://localhost:8089/forum/posts') // adjust to your actual endpoint
      .subscribe((data) => {
        this.posts = data;
      });
  }

  createPost() {
    const post = {
      title: this.newPost.title,
      content: this.newPost.content,
      author: this.currentUser, // Or handle this on backend with user context
    };

    this.http
      .post<any>('http://localhost:8089/forum/posts', post)
      .subscribe((created) => {
        this.posts.unshift(created);
        this.newPost = { title: '', content: '' };
      });
  }

  deletePost(postId: number) {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.http
        .delete(`http://localhost:8089/forum/posts/${postId}`)
        .subscribe(() => {
          this.posts = this.posts.filter((post) => post.id !== postId);
        });
    }
  }

  savePostEdit() {
    if (this.postEditTitle.trim() && this.postEditContent.trim()) {
      const updatedPost = {
        ...this.selectedPost,
        title: this.postEditTitle.trim(),
        content: this.postEditContent.trim(),
      };

      this.http
        .put<any>(
          `http://localhost:8089/forum/posts/${updatedPost.id}`,
          updatedPost
        )
        .subscribe((res) => {
          Object.assign(this.selectedPost, res);
          this.cancelPostEdit();
        });
    }
  }

  //* Comment CRUD methods

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        content: this.newComment.trim(),
        author: this.currentUser, // backend might use session
      };

      this.http
        .post<any>(
          `http://localhost:8089/forum/posts/${this.selectedPost.id}/comments`,
          comment
        )
        .subscribe((createdComment) => {
          if (!this.selectedPost.comments) {
            this.selectedPost.comments = [];
          }
          this.selectedPost.comments.push(createdComment);
          this.newComment = '';
        });
    }
  }

  saveEditedComment(comment: any) {
    if (this.commentEditContent.trim()) {
      const updated = { ...comment, content: this.commentEditContent.trim() };

      this.http
        .put<any>(`http://localhost:8089/forum/comments/${comment.id}`, updated)
        .subscribe((res) => {
          comment.content = res.content;
          this.cancelEditing();
        });
    }
  }

  deleteComment(commentToDelete: any) {
    if (commentToDelete.author !== this.currentUser) {
      alert('You can only delete your own comments.');
      return;
    }

    this.http
      .delete(`http://localhost:8089/forum/comments/${commentToDelete.id}`)
      .subscribe(() => {
        const index = this.selectedPost.comments.findIndex(
          (c: any) => c.id === commentToDelete.id
        );
        if (index > -1) {
          this.selectedPost.comments.splice(index, 1);
        }
      });
  }

  //* React CRUD methods

  updateReaction(newType: string): void {
    const reaction = { type: newType };

    this.http
      .post(
        `http://localhost:8089/forum/posts/${this.selectedPost.id}/reactions`,
        reaction
      )
      .subscribe(() => {
        if (!this.selectedPost.reactions) {
          this.selectedPost.reactions = {};
        }

        if (this.currentUserReaction) {
          this.selectedPost.reactions[this.currentUserReaction]--;
        }

        this.currentUserReaction = newType;

        if (!this.selectedPost.reactions[newType]) {
          this.selectedPost.reactions[newType] = 0;
        }
        this.selectedPost.reactions[newType]++;
        this.selectedPost = { ...this.selectedPost };
      });
  }

  removeReaction(type: string): void {
    this.http
      .delete(
        `http://localhost:8089/forum/posts/${this.selectedPost.id}/reactions`
      )
      .subscribe(() => {
        if (this.selectedPost.reactions[type] > 0) {
          this.selectedPost.reactions[type]--;
        }
        this.currentUserReaction = null;
        this.selectedPost = { ...this.selectedPost };
      });
  }

  openPost(post: any): void {
    console.log('Selected post:', post); // To debug
    this.selectedPost = post;
  }

  newComment: string = '';

  startEditingComment(comment: any) {
    if (comment.author !== this.currentUser) {
      return; // Prevent editing if not the author
    }
    this.commentBeingEdited = comment;
    this.commentEditContent = comment.content;
  }

  cancelEditing() {
    this.commentBeingEdited = null;
    this.commentEditContent = '';
  }

  isEditingPost: boolean = false;
  postEditTitle: string = '';
  postEditContent: string = '';

  startEditingPost() {
    if (this.selectedPost.author !== this.currentUser) return;
    this.isEditingPost = true;
    this.postEditTitle = this.selectedPost.title;
    this.postEditContent = this.selectedPost.content;
  }

  cancelPostEdit() {
    this.isEditingPost = false;
    this.postEditTitle = '';
    this.postEditContent = '';
  }

  // Example setup
  reactionTypes = ['UPVOTE', 'DOWNVOTE', 'HEART', 'SAD', 'LAUGH', 'CELEBRATE'];
  currentUserReaction: string | null = null; // Current reaction of the user for selectedPost

  reactToPost(type: string): void {
    if (!this.selectedPost) return;

    // Toggle: if same reaction is clicked again, remove it
    if (this.currentUserReaction === type) {
      this.removeReaction(type);
    } else {
      this.updateReaction(type);
    }
  }

  // Used in template to style the selected reaction
  hasReacted(type: string): boolean {
    return this.currentUserReaction === type;
  }

  // Count reactions
  getReactionCount(type: string): number {
    return this.selectedPost?.reactions?.[type] || 0;
  }

  // Emoji mapping
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
}
