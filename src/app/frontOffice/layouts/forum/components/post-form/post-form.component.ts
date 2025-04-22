import { Component, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class ForumPostFormComponent {
  constructor(private http: HttpClient) {
    console.log('✅ ForumPostFormComponent constructor');
  }

  posts: any[] = [];

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

  generationPrompt: string = '';
  generating: boolean = false;

  generatePost() {
    if (!this.generationPrompt.trim()) {
      alert('Please enter a prompt to generate content.');
      return;
    }
  
    this.generating = true;
    this.http
      .post<{ result: string }>('http://localhost:8089/api/ai/generate-post', {
        prompt: this.generationPrompt,
      })
      .subscribe({
        next: (response) => {
          const result = response.result.trim();
          console.log('🧠 AI Response:', result);
  
          const titleMatch = result.match(/Title:\s*(.+)/);
const contentMatch = result.match(/Content:\s*([\s\S]*)/);

this.newPost.title = titleMatch ? titleMatch[1].trim() : 'Generated Post';
this.newPost.content = contentMatch ? contentMatch[1].trim() : '';
          this.generating = false;
        },
        error: (err) => {
          console.error('❌ AI generation failed:', err);
          alert('Error generating post. Please check console for details.');
          this.generating = false;
        },
      });
  }
  
  

  createPost() {
    if (!this.newPost.title || !this.newPost.content) return;

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
      tag: finalTag,
      author: {
        id: 1, // Static user for now
      },
    };

    this.http
      .post<Post>('http://localhost:8089/forum/posts', postPayload)
      .subscribe({
        next: (createdPost) => {
          this.posts.unshift(createdPost);
          this.newPost = {
            title: '',
            content: '',
            tag: '',
            author: '',
            createdAt: '',
            replies: 0,
            likes: 0,
          };
          this.customTag = '';
          this.selectedCategory = 'Discussion';
          this.generationPrompt = '';
        },
        error: (err) => {
          console.error('❌ Failed to create post:', err);
          alert('Error creating post. Please check console for details.');
        },
      });
  }

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }
  
  resetForm() {
    this.newPost = {
      title: '',
      content: '',
      tag: '',
      author: '',
      createdAt: '',
      replies: 0,
      likes: 0,
    };
    this.selectedCategory = 'All';
    this.customTag = '';
    this.generationPrompt = '';
    this.generating = false;
  }
}
