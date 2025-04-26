import { Component, Input, OnInit } from '@angular/core';

import { PostDetailModalService } from 'src/app/Services/post-detail-modal/post-detail-modal.service'; 


@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.css'],
})
export class PostDetailModalComponent {
  @Input() posts: any[] = [];
  @Input() selectedPost: any;
  reactionTypes = ['UPVOTE', 'DOWNVOTE', 'HEART', 'SAD', 'LAUGH', 'CELEBRATE'];
  currentUser: string = 'Chiha';
  currentUserReaction: string | null = null;
  commentBeingEdited: any = null;
  commentEditContent: string = '';
  newComment: string = '';
  isEditingPost: boolean = false;
  postEditTitle: string = '';
  postEditContent: string = '';
  reportingTarget: any = null;
  reportReason: string = '';

  constructor(private postService: PostDetailModalService) {}

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

  fetchPostDetails() {
    this.postService.getPostDetails(this.selectedPost.id).subscribe((post) => {
      this.selectedPost = post;
    });
  }

  incrementViewCount() {
    if (!this.selectedPost?.id) return;
    this.postService
      .incrementViewCount(this.selectedPost.id)
      .subscribe((updatedPost) => {
        this.selectedPost.viewCount = updatedPost.viewCount;
      });
  }

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
      this.postService.updatePost(updatedPost).subscribe({
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
      this.postService
        .removeReaction(this.selectedPost.id, type, this.currentUser)
        .subscribe(() => {
          this.currentUserReaction = null;
          if (this.selectedPost.reactions?.[type]) {
            this.selectedPost.reactions[type]--;
          }
          this.selectedPost = { ...this.selectedPost };
        });
    } else {
      const reaction = { type };
      this.postService
        .addReaction(this.selectedPost.id, reaction, this.currentUser)
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

  // Use the service methods for reaction checks
  hasReacted(type: string): boolean {
    return this.postService.hasReacted(this.currentUserReaction || '', type);
  }

  getReactionEmoji(type: string): string {
    return this.postService.getReactionEmoji(type);
  }

  getReactionCount(type: string): number {
    return this.postService.getReactionCount(this.selectedPost, type);
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        content: this.newComment.trim(),
        author: { id: 1 },
      };
      this.postService
        .addComment(this.selectedPost.id, comment)
        .subscribe((createdComment) => {
          if (!this.selectedPost.comments) {
            this.selectedPost.comments = [];
          }
          this.selectedPost.comments.push(createdComment);
          this.newComment = '';
        });
    }
  }

  startEditingComment(comment: any) {
    if (comment.author?.name !== this.currentUser) {
      return;
    }
    this.commentBeingEdited = comment;
    this.commentEditContent = comment.content;
  }

  saveEditedComment(comment: any) {
    if (this.commentEditContent.trim()) {
      const updated = { content: this.commentEditContent.trim() };
      this.postService.updateComment(comment.id, updated).subscribe({
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

  deleteComment(commentToDelete: any) {
    if (commentToDelete.author?.name !== this.currentUser) {
      alert('You can only delete your own comments.');
      return;
    }
    this.postService.deleteComment(commentToDelete.id).subscribe(() => {
      const index = this.selectedPost.comments.findIndex(
        (c: any) => c.id === commentToDelete.id
      );
      if (index > -1) {
        this.selectedPost.comments.splice(index, 1);
      }
    });
  }

  openReportModal(target: any) {
    this.reportingTarget = target;
  }

  closeReportModal() {
    this.reportingTarget = null;
    this.reportReason = '';
  }

  submitReport() {
    if (!this.reportReason.trim() || !this.reportingTarget) {
      alert('Please provide a valid reason.');
      return;
    }
    const reason = this.reportReason.trim();
    const targetType = this.reportingTarget.title ? 'post' : 'comment';
    this.postService
      .submitReport(this.reportingTarget.id, targetType, reason)
      .subscribe({
        next: () => {
          alert('✅ Report submitted. Thank you!');
          this.closeReportModal();
        },
        error: (err) => {
          console.error('❌ Failed to submit report:', err);
          alert('There was an error submitting your report.');
        },
      });
  }
}
