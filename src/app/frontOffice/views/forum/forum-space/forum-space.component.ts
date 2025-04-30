import { Component, OnInit } from '@angular/core';
import { ForumService,Post } from 'src/app/Services/forum-space/forum-space.service';
import { UserService } from 'src/app/Services/user/user.service';


@Component({
  selector: 'app-forum-space',
  templateUrl: './forum-space.component.html',
  styleUrls: ['./forum-space.component.css'],
})
export class ForumSpaceComponent implements OnInit {
  posts: Post[] = [];
  topPosts: Post[] = [];
  selectedPost: Post | null = null;
  currentUser = this.userService.getCurrentUsername() ;
  currentUserReaction: string | null = null;
  isModalOpen: boolean = false;
  selectedCategory: string = 'All';
  showTopPosts: boolean = false;
  isEditingPost: boolean = false;

  constructor(private forumService: ForumService, private userService : UserService) {}

  ngOnInit() {
    console.log('✅ Current usernameee:', this.userService.getCurrentUsername());
    this.loadPosts();
    this.loadTopPosts();
  }

  loadPosts() {
    this.forumService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.map((post) => ({
          ...post,
          comments: post.comments || [],
          reactions: post.reactions || {},
        }));
      },
      error: (err) => console.error('Failed to load posts', err),
    });
  }

  loadTopPosts() {
    this.forumService.getTopPosts().subscribe({
      next: (posts) => {
        this.topPosts = posts;
      },
      error: (err) => console.error('Error loading top posts', err),
    });
  }

  fetchCurrentUserReaction(postId: number) {
    this.forumService
      .getUserReaction(postId, this.currentUser!)
      .subscribe((reaction) => {
        this.currentUserReaction = reaction;
      });
  }

  deletePost(postId: number) {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.forumService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter((post) => post.id !== postId);
          if (this.selectedPost && this.selectedPost.id === postId) {
            this.selectedPost = null;
            this.isEditingPost = false;
          }
        },
        error: (err) => console.error('❌ Failed to delete post:', err),
      });
    }
  }

  openPostModal(post: Post) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closePostModal() {
    this.selectedPost = null;
    this.isModalOpen = false;
  }
}
