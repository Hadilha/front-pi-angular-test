import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  
  isEditingPost: boolean = false;
  selectedPost: any = null;
  currentUser: string = 'Chiha';
  currentUserReaction: string | null = null; 
  selectedCategory: string = 'All';
  posts: any[] = [];
  tags: string[] = [
    'All',
    'Discussion',
    'Question',
    'Help',
    'Feedback',
    'Other',
  ];

  constructor(private http: HttpClient) {
      console.log('✅ ForumSpaceComponent constructor');
    }

    
  getPosts() {
    this.http
      .get<any[]>('http://localhost:8089/forum/posts') // adjust to your actual endpoint
      .subscribe((data) => {
        this.posts = data; // Assign the fetched data to the posts array
        console.log('Posts fetched:', this.posts); // Log the data for debugging
      });
  }

  fetchPosts() {
      if (this.selectedCategory === 'Other') {
        this.http.get<Post[]>('http://localhost:8089/forum/posts').subscribe({
          next: (posts) => {
            // Filter posts that don't belong to main categories
            const mainTags = ['Discussion', 'Question', 'Help', 'Feedback'];
            this.posts = posts.filter(
              (post) => !mainTags.includes(post.tag) && post.tag !== 'Custom'
            );
          },
          error: (err) => {
            console.error('Error fetching posts', err);
          },
        });
      } else if (this.selectedCategory === 'All') {
        this.http.get<Post[]>('http://localhost:8089/forum/posts').subscribe({
          next: (posts) => {
            this.posts = posts;
          },
          error: (err) => {
            console.error('Error fetching posts', err);
          },
        });
      } else {
        // For specific tags (including custom)
        this.http
          .get<Post[]>(
            `http://localhost:8089/forum/posts?tag=${this.selectedCategory}`
          )
          .subscribe({
            next: (posts) => {
              this.posts = posts;
            },
            error: (err) => {
              console.error('Error fetching posts', err);
            },
          });
      }
    }

    openPost(post: any): void {
      this.selectedPost = post;
  
      // Load comments
      this.http
        .get<Comment[]>(`http://localhost:8089/forum/comments/byPost/${post.id}`)
        .subscribe((comments) => {
          this.selectedPost.comments = comments;
        });
  
      // Load reactions count first
      this.http
        .get<{ [key: string]: number }>(
          `http://localhost:8089/forum/posts/${post.id}/reactions`
        )
        .subscribe((reactionCounts) => {
          this.selectedPost.reactions = reactionCounts;
  
          // THEN load user reaction and sync if necessary
          this.http
            .get<string>(
              `http://localhost:8089/forum/posts/${post.id}/reactions/user-reaction?username=${this.currentUser}`
            )
            .subscribe((reaction) => {
              this.currentUserReaction = reaction;
  
              // Make sure the count includes the user's reaction
              if (reaction) {
                if (!this.selectedPost.reactions[reaction]) {
                  this.selectedPost.reactions[reaction] = 1;
                }
              }
  
              this.selectedPost = { ...this.selectedPost }; // Refresh view
            });
        });
    }

    deletePost(postId: number) {
      const confirmed = confirm('Are you sure you want to delete this post?');
      if (confirmed) {
        this.http
          .delete(`http://localhost:8089/forum/posts/${postId}`)
          .subscribe({
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
}
