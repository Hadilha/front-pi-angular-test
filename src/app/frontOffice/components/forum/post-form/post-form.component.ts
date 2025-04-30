import { Component, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ImageUploadService } from 'src/app/Services/image-upload/image-upload.service';
import { PostFormService } from 'src/app/Services/post-form/post-form.service';


@Component({
  selector: 'app-forum-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumPostFormComponent {
  constructor(
    private postService: PostFormService,
    private imageUploadService: ImageUploadService,
    private toastr: ToastrService
  ) {
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

  imageFile: File | null = null;
  imagePreviewUrl: string | null = null;
  uploadedImageUrl: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  uploadImage(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!this.imageFile) return resolve(null);

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];

        this.imageUploadService
          .uploadImageFromUrl(base64, this.imageFile!.name)
          .subscribe({
            next: (res) => {
              // Accessing the correct image URL from the response
              const imageUrl = res?.data?.url; // Use this field from the response
              this.uploadedImageUrl = imageUrl;
              resolve(imageUrl);
            },
            error: (err) => {
              console.error('❌ Image upload failed:', err);
              reject(err);
            },
          });
      };

      reader.readAsDataURL(this.imageFile!);
    });
  }

  async createPost() {
    if (!this.newPost.title || !this.newPost.content) return;

    const finalTag =
      this.selectedCategory === 'Custom'
        ? this.customTag.trim()
        : this.selectedCategory;

    if (!finalTag) {
      alert('Please select or enter a valid tag');
      return;
    }

    try {
      const imageUrl = await this.uploadImage();

      const postPayload: any = {
        title: this.newPost.title,
        content: this.newPost.content,
        tag: finalTag,
        author: { id: 1 },
      };

      if (imageUrl) {
        postPayload.imageUrl = imageUrl;
      }

      this.postService.createPost(postPayload).subscribe({
        next: (createdPost) => {
          this.posts.unshift(createdPost);
          this.toastr.success('Post submitted successfully! 🎉');
          this.resetForm();
        },
        error: (err) => {
          console.error('❌ Failed to create post:', err);
          this.toastr.error('Failed to submit post. Please try again.');
        },
      });
    } catch (e) {
      console.error('⛔ Post creation cancelled due to image upload failure.');
    }
  }

  isModalOpen = false;
  openModal() {
    console.log(this.isModalOpen);
    console.log('Opening modal'); // Add this
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }

  closeModal() {
    console.log('Closing modal'); // Add this
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
