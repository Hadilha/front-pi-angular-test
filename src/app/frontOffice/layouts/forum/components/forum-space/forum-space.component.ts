// forum-space.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-forum-space',
  templateUrl: './forum-space.component.html',
  styleUrls: ['./forum-space.component.css'],
})

export class ForumSpaceComponent {
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
      content:
        "I'm new to Angular and wondering where the best place to start is...",
      createdAt: new Date(),
      replies: 4,
      likes: 10,
      comments: [
        {
          author: 'Alice',
          content: 'Try the official Angular docs!',
          createdAt: new Date(),
        },
        {
          author: 'Bob',
          content: 'YouTube tutorials help too.',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 2, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content:
        "I'm new to Angular and wondering where the best place to start is...",
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    {
      id: 3, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content:
        "I'm new to Angular and wondering where the best place to start is...",
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    {
      id: 4, // 👈 Add this
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/40',
      title: 'How do I get started with Angular?',
      content:
        "I'm new to Angular and wondering where the best place to start is...",
      createdAt: new Date(),
      replies: 4,
      likes: 10,
    },
    {
      id: 5,
      author: 'John Doe',
      title: 'Post 1',
      content: 'This is post 1',
      avatar: 'url-to-avatar',
      createdAt: new Date(),
      replies: 2,
      likes: 5,
    },
    {
      id: 6,
      author: 'Jane Doe',
      title: 'Post 2',
      content: 'This is post 2',
      avatar: 'url-to-avatar',
      createdAt: new Date(),
      replies: 3,
      likes: 10,
    },
  ];

  createPost() {
    const post = {
      id: Date.now(), // 👈 or use a UUID generator for more realistic data
      author: 'John Doe',
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
    console.log('Selected post:', post); // To debug
    this.selectedPost = post;
  }

  deletePost(postId: number) {
    // Confirm deletion (optional)
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      // Filter out the post from the array
      this.posts = this.posts.filter((post) => post.id !== postId);
    }
  }

  newComment: string = '';

  comments = [
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a great post!',
      createdAt: new Date(),
      isEditing: false,
    },
    {
      id: 2,
      author: 'Jane Doe',
      content: 'Thanks for sharing!',
      createdAt: new Date(),
      isEditing: false,
    },
  ];
  

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        id: Date.now(), // Unique id for the new comment
        author: this.currentUser,
        content: this.newComment.trim(),
        createdAt: new Date(),
      };
  
      if (!this.selectedPost.comments) {
        this.selectedPost.comments = [];
      }
  
      this.selectedPost.comments.push(comment);
      this.newComment = '';
    }
  }
  

  commentBeingEdited: any = null;
  commentEditContent: string = '';
  //currentUser: string = 'Hadil'; // Replace with actual user (ideally from auth service)
  
  startEditingComment(comment: any) {
    if (comment.author !== this.currentUser) {
      return; // Prevent editing if not the author
    }
    this.commentBeingEdited = comment;
    this.commentEditContent = comment.content;
  }
  
  
  
  cancelEditing() {
    this.commentBeingEdited = null;
    this.commentEditContent = '';
  }
  
  saveEditedComment(comment: any) {
    if (this.commentEditContent.trim()) {
      comment.content = this.commentEditContent.trim();
      // TODO: Call backend API to update comment
      this.cancelEditing();
    }
  }
  
  deleteComment(commentToDelete: any) {
    if (commentToDelete.author !== this.currentUser) {
      alert("You can only delete your own comments.");
      return;
    }
  
    const index = this.selectedPost.comments.findIndex(
      (c: any) => c.id === commentToDelete.id
    );
    if (index > -1) {
      this.selectedPost.comments.splice(index, 1);
      // TODO: Call backend API to delete comment
    }
  }

  isEditingPost: boolean = false;
postEditTitle: string = '';
postEditContent: string = '';

startEditingPost() {
  if (this.selectedPost.author !== this.currentUser) return;
  this.isEditingPost = true;
  this.postEditTitle = this.selectedPost.title;
  this.postEditContent = this.selectedPost.content;
}

cancelPostEdit() {
  this.isEditingPost = false;
  this.postEditTitle = '';
  this.postEditContent = '';
}

savePostEdit() {
  if (this.postEditTitle.trim() && this.postEditContent.trim()) {
    this.selectedPost.title = this.postEditTitle.trim();
    this.selectedPost.content = this.postEditContent.trim();

    // TODO: Call backend API to update post
    this.cancelPostEdit();
  }
}

  

}
