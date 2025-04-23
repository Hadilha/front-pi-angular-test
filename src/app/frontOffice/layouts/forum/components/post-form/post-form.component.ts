import { Component, ViewEncapsulation } from '@angular/core';
import { PostFormService, Post } from '../../service/post-form/post-form.service'; 

@Component({
  selector: 'app-forum-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumPostFormComponent {
  constructor(private postService: PostFormService) {
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
    this.postService.generatePostContent(this.generationPrompt).subscribe({
      next: (response) => {
        const result = response.result.trim();
        console.log('🧠 AI Response:', result);

        const titleMatch = result.match(/Title:\s*(.+)/);
        const contentMatch = result.match(/Content:\s*([\s\S]*)/);

        this.newPost.title = titleMatch ? titleMatch[1].trim() : '';
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
      this.selectedCategory === 'Custom' ? this.customTag.trim() : this.selectedCategory;
  
    if (!finalTag) {
      alert('Please select or enter a valid tag');
      return;
    }
  
    // Create payload with only necessary fields
    const postPayload = {
      title: this.newPost.title,
      content: this.newPost.content,
      tag: finalTag,
      author: { id: 1 } // Only send author ID
    };
  
    this.postService.createPost(postPayload).subscribe({
      next: (createdPost) => {
        this.posts.unshift(createdPost);
        this.resetForm();
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
