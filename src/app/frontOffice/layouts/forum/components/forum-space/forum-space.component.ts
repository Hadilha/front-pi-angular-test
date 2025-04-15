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
  replies: number;
  likes: number;
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
    console.log('✅ ForumSpaceComponent constructor');
  }

  posts: any[] = [];
  selectedPost: any = null;
  currentUser: string = 'Chiha';
  commentBeingEdited: any = null;
  commentEditContent: string = '';

  newPost = {
    title: '',
    content: '',
    tag: '',
    author: '',
    createdAt: '',
    replies: 0,
    likes: 0,
  };

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

  ngOnInit() {
    console.log('✅ Current user:', this.currentUser);
    //this.getCommentCountForPost(this.selectedPost.id);
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
  }

  // forum-space.component.ts

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

  //* POST CRUD methods
  getPosts() {
    this.http
      .get<any[]>('http://localhost:8089/forum/posts') // adjust to your actual endpoint
      .subscribe((data) => {
        this.posts = data; // Assign the fetched data to the posts array
        console.log('Posts fetched:', this.posts); // Log the data for debugging
      });
  }

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

  savePostEdit() {
    if (this.postEditTitle.trim() && this.postEditContent.trim()) {
      const updatedPost = {
        ...this.selectedPost,
        title: this.postEditTitle.trim(),
        content: this.postEditContent.trim(),
      };

      this.http
        .put<any>(
          `http://localhost:8089/forum/posts/${updatedPost.id}`,
          updatedPost
        )
        .subscribe({
          next: (res) => {
            // 🔁 Update the post in the list
            const index = this.posts.findIndex((post) => post.id === res.id);
            if (index !== -1) {
              this.posts[index] = res;
            }

            // 🔁 Also update selectedPost to reflect the changes in the modal
            this.selectedPost = res;

            this.cancelPostEdit(); // Close the edit form
          },
          error: (err) => {
            console.error('❌ Failed to update post:', err);
          },
        });
    }
  }

  isEditingPost: boolean = false;
  postEditTitle: string = '';
  postEditContent: string = '';

  startEditingPost() {
    console.log('🛠 startEditingPost called');
    console.log('👤 selectedPost.author:', this.selectedPost.author);
    console.log('👤 currentUser:', this.currentUser);

    if (this.selectedPost.author?.name !== this.currentUser) {
      console.warn('🚫 Edit not allowed: not the author');
      return;
    }

    this.isEditingPost = true;
    this.postEditTitle = this.selectedPost.title;
    this.postEditContent = this.selectedPost.content;
  }

  cancelPostEdit() {
    this.isEditingPost = false;
    this.postEditTitle = '';
    this.postEditContent = '';
  }

  //* Comment CRUD methods

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        content: this.newComment.trim(),
        author: {
          id: 1, // Or get from session later
        },
      };

      this.http
        .post<any>(
          `http://localhost:8089/forum/comments?postId=${this.selectedPost.id}`,
          comment
        )
        .subscribe((createdComment) => {
          if (!this.selectedPost.comments) {
            this.selectedPost.comments = [];
          }
          this.selectedPost.comments.push(createdComment);
          this.newComment = '';
        });
    }
  }

  saveEditedComment(comment: any) {
    if (this.commentEditContent.trim()) {
      const updated = {
        content: this.commentEditContent.trim(),
      };

      console.log('Sending update:', updated); // Log the data to check

      this.http
        .put<any>(`http://localhost:8089/forum/comments/${comment.id}`, updated)
        .subscribe({
          next: (res) => {
            comment.content = res.content;
            this.cancelEditing();
          },
          error: (err) => {
            console.error('❌ Error saving edited comment:', err); // Log the error to the console
          },
        });
    }
  }

  deleteComment(commentToDelete: any) {
    if (commentToDelete.author?.name !== this.currentUser) {
      alert('You can only delete your own comments.');
      return;
    }

    this.http
      .delete(`http://localhost:8089/forum/comments/${commentToDelete.id}`)
      .subscribe(() => {
        const index = this.selectedPost.comments.findIndex(
          (c: any) => c.id === commentToDelete.id
        );
        if (index > -1) {
          this.selectedPost.comments.splice(index, 1);
        }
      });
  }

  startEditingComment(comment: any) {
    if (comment.author?.name !== this.currentUser) {
      return; // Prevent editing if not the author
    }
    this.commentBeingEdited = comment;
    this.commentEditContent = comment.content;
  }

  cancelEditing() {
    this.commentBeingEdited = null;
    this.commentEditContent = '';
  }
  /*
  getCommentCount(postId: number) {
    return this.http.get<number>(`http://localhost:8089/forum/comments/count/${postId}`);
  }
  
  getCommentCountForPost(postId: number): void {
    this.http.get<number>(`http://localhost:8089/forum/comments/count/${postId}`).subscribe(
      (count) => {
        this.selectedPost.commentCount = count; // Store the count on selectedPost
      },
      (error) => {
        console.error('Error fetching comment count', error);
      }
    );
  }*/

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

  reactToPost(type: string): void {
    if (!this.selectedPost) return;

    if (this.currentUserReaction === type) {
      // Remove existing reaction
      this.http
        .delete(
          `http://localhost:8089/forum/posts/${this.selectedPost.id}/reactions?username=${this.currentUser}&type=${type}`
        )
        .subscribe(() => {
          this.currentUserReaction = null;

          // Decrement count safely
          if (this.selectedPost.reactions?.[type]) {
            this.selectedPost.reactions[type]--;
          }

          this.selectedPost = { ...this.selectedPost }; // Trigger UI refresh
        });
    } else {
      // Add or update reaction
      const reaction = { type };

      this.http
        .post(
          `http://localhost:8089/forum/posts/${this.selectedPost.id}/reactions?username=${this.currentUser}`,
          reaction
        )
        .subscribe(() => {
          // Update counts
          if (this.currentUserReaction) {
            // User had a previous reaction
            if (this.selectedPost.reactions?.[this.currentUserReaction]) {
              this.selectedPost.reactions[this.currentUserReaction]--;
            }
          }

          if (!this.selectedPost.reactions[type]) {
            this.selectedPost.reactions[type] = 0;
          }

          this.selectedPost.reactions[type]++;
          this.currentUserReaction = type;
          this.selectedPost = { ...this.selectedPost }; // Trigger UI refresh
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

  newComment: string = '';

  // Example setup
  reactionTypes = ['UPVOTE', 'DOWNVOTE', 'HEART', 'SAD', 'LAUGH', 'CELEBRATE'];
  currentUserReaction: string | null = null; // Current reaction of the user for selectedPost

  // Used in template to style the selected reaction
  hasReacted(type: string): boolean {
    return this.currentUserReaction === type;
  }

  // Count reactions
  getReactionCount(type: string): number {
    return this.selectedPost?.reactions?.[type] || 0;
  }

  // Emoji mapping
  getReactionEmoji(type: string): string {
    const map: { [key: string]: string } = {
      UPVOTE: '👍',
      DOWNVOTE: '👎',
      HEART: '❤️',
      SAD: '😢',
      LAUGH: '😂',
      CELEBRATE: '🎉',
    };
    return map[type] || '❓';
  }
}
