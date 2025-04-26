import { Component, OnInit } from '@angular/core';

import { PostListService } from 'src/app/Services/post-list/post-list.service'; 
import { Post } from 'src/app/Services/forum-space/forum-space.service'; 


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  isEditingPost: boolean = false;
  selectedPost: Post | null = null;
  currentUser: string = 'Chiha';
  currentUserReaction: string | null = null;
  selectedCategory: string = 'All';
  posts: Post[] = [];
  tags: string[] = [
    'All',
    'Discussion',
    'Question',
    'Help',
    'Feedback',
    'Other',
  ];

  constructor(private postService: PostListService) {
    console.log('✅ PostListComponent constructor');
  }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPostDetails(postId: number): void {
    this.postService.getPostDetails(postId).subscribe((post) => {
      this.selectedPost = post;
    });
  }

  fetchPosts(): void {
    if (this.selectedCategory === 'Other') {
      this.postService.getPosts().subscribe((posts) => {
        const mainTags = ['Discussion', 'Question', 'Help', 'Feedback'];
        this.posts = posts.filter(
          (post) => !mainTags.includes(post.tag) && post.tag !== 'Custom'
        );
      });
    } else if (this.selectedCategory === 'All') {
      this.postService.getPosts().subscribe((posts) => {
        this.posts = posts;
      });
    } else {
      this.postService.getPosts().subscribe((posts) => {
        this.posts = posts.filter((post) => post.tag === this.selectedCategory);
      });
    }
  }

  openPost(post: Post): void {
    this.selectedPost = post;

    // Load comments
    this.postService.getCommentsForPost(post.id).subscribe((comments) => {
      this.selectedPost!.comments = comments;
    });

    // Load reactions count first
    this.postService
      .getReactionsForPost(post.id)
      .subscribe((reactionCounts) => {
        this.selectedPost!.reactions = reactionCounts;

        // THEN load user reaction and sync if necessary
        this.postService
          .getUserReactionForPost(post.id, this.currentUser)
          .subscribe((reaction) => {
            this.currentUserReaction = reaction;

            // Make sure the count includes the user's reaction
            if (reaction) {
              if (!this.selectedPost!.reactions[reaction]) {
                this.selectedPost!.reactions[reaction] = 1;
              }
            }

            this.selectedPost = { ...this.selectedPost! }; // Refresh view
          });
      });
  }

  deletePost(postId: number): void {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter((post) => post.id !== postId);

          // ✅ Close the modal if it's the deleted post
          if (this.selectedPost && this.selectedPost.id === postId) {
            this.selectedPost = null;
            this.isEditingPost = false;
          }
        },
        error: (err) => {
          console.error('❌ Failed to delete post:', err);
        },
      });
    }
  }

  reportingPost: Post | null = null;
  reportReason: string = '';

  openReportModal(post: Post): void {
    this.reportingPost = post;
    this.reportReason = '';
  }

  closeReportModal(): void {
    this.reportingPost = null;
    this.reportReason = '';
  }

  submitReport(): void {
    if (!this.reportingPost || !this.reportReason.trim()) {
      alert('Please provide a reason for the report.');
      return;
    }

    const postId = this.reportingPost.id;
    const reason = this.reportReason;

    this.postService.reportPost(postId, reason).subscribe({
      next: () => {
        alert('✅ Report submitted successfully.');
        this.closeReportModal();
      },
      error: (err) => {
        console.error('❌ Failed to submit report:', err);
        alert('There was an error submitting the report.');
      },
    });
  }
}
