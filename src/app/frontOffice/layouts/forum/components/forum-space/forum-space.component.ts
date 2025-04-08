// forum-space.component.ts
import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-forum-space',
  templateUrl: './forum-space.component.html',
  styleUrls: ['./forum-space.component.css']
})
export class ForumSpaceComponent {

  
  //post: Post[] = [];
  //public showCreateModal: boolean = false;
  selectedPost: any = null;
  currentUser: string = 'John Doe';

  newPost = {
    title: '',
    content: '',
  };

  posts = [
    {
      id: 1, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content: 'I\'m new to Angular and wondering where the best place to start is...',
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    {
      id: 2, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content: 'I\'m new to Angular and wondering where the best place to start is...',
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    {
      id: 3, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content: 'I\'m new to Angular and wondering where the best place to start is...',
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    {
      id: 4, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content: 'I\'m new to Angular and wondering where the best place to start is...',
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    { id: 5, author: 'John Doe', title: 'Post 1', content: 'This is post 1', avatar: 'url-to-avatar', createdAt: new Date(), replies: 2, likes: 5 },
    { id: 6, author: 'Jane Doe', title: 'Post 2', content: 'This is post 2', avatar: 'url-to-avatar', createdAt: new Date(), replies: 3, likes: 10 },
    

  ];
  

  createPost() {
    const post = {
      id: Date.now(), // 👈 or use a UUID generator for more realistic data
      author: 'Current User',
      avatar: 'https://i.pravatar.cc/40?u=' + Math.random(),
      title: this.newPost.title,
      content: this.newPost.content,
      createdAt: new Date(),
      replies: 0,
      likes: 0,
    };
    
  
    this.posts.unshift(post);
    this.newPost = { title: '', content: '' };
  }

  openPost(post: any): void {
    console.log('Selected post:', post);  // To debug
    this.selectedPost = post;
  }
    
  deletePost(postId: number) {
    // Confirm deletion (optional)
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      // Filter out the post from the array
      this.posts = this.posts.filter(post => post.id !== postId);
    }
  }

  
  

  /*constructor(private postService: PostService) {
    this.postService.getPosts().subscribe(posts => this.post = posts);
  }

  refreshPosts() {
    this.postService.getPosts().subscribe(posts => this.post = posts);
  }*/
}    
