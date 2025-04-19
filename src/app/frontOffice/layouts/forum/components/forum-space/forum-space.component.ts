// forum-space.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categoryFilter' })
export class CategoryFilterPipe implements PipeTransform {
  transform(posts: any[], selectedCategory: string): any[] {
    if (selectedCategory === 'All' || !selectedCategory) return posts;
    return posts.filter((post) => post.tag === selectedCategory);
  }
}

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
  comments: any[];
  reactions: { [key: string]: number };
}

@Component({
  selector: 'app-forum-space',
  templateUrl: './forum-space.component.html',
  styleUrls: ['./forum-space.component.css'],
})
export class ForumSpaceComponent implements OnInit {
  constructor(private http: HttpClient) {
    console.log('ForumSpaceComponent constructor');
  }

  posts: any[] = [];
  selectedPost: any = null;
  currentUser: string = 'Chiha';

  currentUserReaction: string | null = null; // Current reaction of the user for selectedPost
  isModalOpen: boolean = false;
  selectedCategory: string = 'All';

  ngOnInit() {
    console.log('✅ Current user:', this.currentUser);
    this.http.get<any[]>('http://localhost:8089/forum/posts').subscribe({
      next: (data) => {
        this.posts = data.map((post) => ({
          ...post,
          comments: post.comments || [],
          reactions: post.reactions || {},
        }));
      },
      error: (err) => {
        console.error('Failed to load posts', err);
      },
    });
    this.loadTopPosts();
  }

  //* React CRUD methods
  fetchCurrentUserReaction(postId: number): void {
    this.http
      .get<string>(
        `http://localhost:8089/forum/posts/${postId}/reactions/user-reaction?username=${this.currentUser}`
      )
      .subscribe((reaction) => {
        this.currentUserReaction = reaction;
      });
  }

  openPostModal(post: any) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closePostModal() {
    this.isModalOpen = false;
    this.selectedPost = null;
  }

  //topPosts: any[] = [];
  topPosts: any[] = [];

  loadTopPosts() {
    this.http
      .get<any[]>('http://localhost:8089/forum/posts/top-posts')
      .subscribe(
        (posts) => {
          console.log('Top Posts:', posts); // Check the data in console
          if (posts && posts.length > 0) {
            this.topPosts = posts;
          } else {
            console.log('No top posts available.');
          }
        },
        (error) => {
          console.error('Error loading top posts', error);
        }
      );
  }

  showTopPosts: boolean = false;
  isEditingPost: boolean = false;

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
