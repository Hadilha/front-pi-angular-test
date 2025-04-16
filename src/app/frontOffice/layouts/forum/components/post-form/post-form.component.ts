import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-forum-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForumPostFormComponent {

  constructor(private http: HttpClient) {
    console.log('✅ ForumSpaceComponent constructor');
  }
  posts: any[] = [];
  // In your component.ts
  tags: string[] = [
    'All',
    'Discussion',
    'Question',
    'Help',
    'Feedback',
    'Other',
  ];
  selectedCategory: string = 'All';
  customTag: string = '';


  newPost = {
    title: '',
    content: '',
    tag: '',
    author: '',
    createdAt: '',
    replies: 0,
    likes: 0,
  };

  createPost() {
    if (!this.newPost.title || !this.newPost.content) return;

    // Determine the final tag value
    const finalTag =
      this.selectedCategory === 'Custom'
        ? this.customTag.trim()
        : this.selectedCategory;

    if (!finalTag) {
      alert('Please select or enter a valid tag');
      return;
    }

    const postPayload = {
      title: this.newPost.title,
      content: this.newPost.content,
      tag: finalTag, // This is the crucial value
      author: {
        id: 1, // Static user ID
      },
    };

    this.http
      .post<Post>('http://localhost:8089/forum/posts', postPayload)
      .subscribe({
        next: (createdPost) => {
          this.posts.unshift(createdPost);
          // Reset form values
          this.newPost = {
            title: '',
            content: '',
            tag: '', // Keep this empty
            author: '',
            createdAt: '',
            replies: 0,
            likes: 0,
          };
          this.customTag = '';
          this.selectedCategory = 'Discussion'; // Reset to default
        },
        error: (err) => {
          console.error('❌ Failed to create post:', err);
          alert('Error creating post. Please check console for details.');
        },
      });
  }
}