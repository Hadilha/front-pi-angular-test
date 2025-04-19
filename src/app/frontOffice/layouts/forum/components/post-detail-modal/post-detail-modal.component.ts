import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.css']
})
export class PostDetailModalComponent {

  @Input() posts: any[] = [];
  @Input() selectedPost: any;

  reactionTypes = ['UPVOTE', 'DOWNVOTE', 'HEART', 'SAD', 'LAUGH', 'CELEBRATE'];

  //selectedPost: any = null;
  currentUser: string = 'Chiha';
  currentUserReaction: string | null = null;

  commentBeingEdited: any = null;
  commentEditContent: string = '';
  newComment: string = '';

  isEditingPost: boolean = false;
  postEditTitle: string = '';
  postEditContent: string = '';

  ngOnInit() {
    this.detectCurrentUserReaction();
    this.incrementViewCount();
    this.fetchPostDetails();
  }
  
  detectCurrentUserReaction() {
    if (!this.selectedPost?.reactionsDetail) return;
  
    const reaction = this.selectedPost.reactionsDetail.find(
      (r: any) => r.user.name === this.currentUser
    );
    this.currentUserReaction = reaction?.type || null;
  }
  

  // Optional: If you're managing a full list of posts, this should be passed or managed via parent
  //posts: any[] = [];

  constructor(private http: HttpClient) {}

  startEditingPost() {
    if (this.selectedPost.author?.name !== this.currentUser) {
      console.warn('🚫 Edit not allowed: not the author');
      return;
    }

    this.isEditingPost = true;
    this.postEditTitle = this.selectedPost.title;
    this.postEditContent = this.selectedPost.content;
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
        .subscribe({
          next: (res) => {
            const index = this.posts.findIndex((post) => post.id === res.id);
            if (index !== -1) {
              this.posts[index] = res;
            }
            this.selectedPost = res;
            this.cancelPostEdit();
          },
          error: (err) => {
            console.error('❌ Failed to update post:', err);
          },
        });
    }
  }

  cancelPostEdit() {
    this.isEditingPost = false;
    this.postEditTitle = '';
    this.postEditContent = '';
  }

  reactToPost(type: string): void {
    if (!this.selectedPost) return;

    if (this.currentUserReaction === type) {
      this.http
        .delete(
          `http://localhost:8089/forum/posts/${this.selectedPost.id}/reactions?username=${this.currentUser}&type=${type}`
        )
        .subscribe(() => {
          this.currentUserReaction = null;
          if (this.selectedPost.reactions?.[type]) {
            this.selectedPost.reactions[type]--;
          }
          this.selectedPost = { ...this.selectedPost };
        });
    } else {
      const reaction = { type };

      this.http
        .post(
          `http://localhost:8089/forum/posts/${this.selectedPost.id}/reactions?username=${this.currentUser}`,
          reaction
        )
        .subscribe(() => {
          if (this.currentUserReaction) {
            if (this.selectedPost.reactions?.[this.currentUserReaction]) {
              this.selectedPost.reactions[this.currentUserReaction]--;
            }
          }

          if (!this.selectedPost.reactions[type]) {
            this.selectedPost.reactions[type] = 0;
          }

          this.selectedPost.reactions[type]++;
          this.currentUserReaction = type;
          this.selectedPost = { ...this.selectedPost };
        });
    }
  }

  getReactionCount(type: string): number {
    return this.selectedPost?.reactions?.[type] || 0;
  }

  hasReacted(type: string): boolean {
    return this.currentUserReaction === type;
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

  saveEditedComment(comment: any) {
    if (this.commentEditContent.trim()) {
      const updated = { content: this.commentEditContent.trim() };

      this.http
        .put<any>(`http://localhost:8089/forum/comments/${comment.id}`, updated)
        .subscribe({
          next: (res) => {
            comment.content = res.content;
            this.cancelEditing();
          },
          error: (err) => {
            console.error('❌ Error saving edited comment:', err);
          },
        });
    }
  }

  cancelEditing() {
    this.commentBeingEdited = null;
    this.commentEditContent = '';
  }

  startEditingComment(comment: any) {
    if (comment.author?.name !== this.currentUser) {
      return;
    }
    this.commentBeingEdited = comment;
    this.commentEditContent = comment.content;
  }

  deleteComment(commentToDelete: any) {
    if (commentToDelete.author?.name !== this.currentUser) {
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

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        content: this.newComment.trim(),
        author: {
          id: 1, // Replace with dynamic user ID later
        },
      };

      this.http
        .post<any>(
          `http://localhost:8089/forum/comments?postId=${this.selectedPost.id}`,
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

  incrementViewCount() {
    if (!this.selectedPost?.id) return;
    
    this.http.get(
      `http://localhost:8089/forum/posts/${this.selectedPost.id}/view`
    ).subscribe({
      next: (updatedPost: any) => {
        // You can optionally update the view count locally if you want
        this.selectedPost.viewCount = updatedPost.viewCount;
      },
      error: (err) => {
        console.error('❌ Failed to increment view count:', err);
      }
    });
  }


fetchPostDetails() {
  this.http.get<any>(`http://localhost:8089/forum/posts/${this.selectedPost.id}`).subscribe(post => {
      this.selectedPost = post;
  });
}
  
}
