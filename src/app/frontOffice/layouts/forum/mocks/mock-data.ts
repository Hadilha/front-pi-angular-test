// mock-data.ts
import { MOCK_POSTS } from './mock-posts';
import { MOCK_COMMENTS } from './mock-comments';
import { MOCK_REACTIONS } from './mock-reactions';
import { MOCK_USERS } from './mock-user'; 

// Ensure all posts have tags property
MOCK_POSTS.forEach(post => {
  if (!post.tags) {
    post.tags = [];
  }
});

// Link relationships
MOCK_POSTS[0].comments = MOCK_COMMENTS.filter(c => c.postId === 1);
MOCK_POSTS[0].reactions = MOCK_REACTIONS.filter(r => r.post.id === 1);
MOCK_POSTS[1].comments = [];
MOCK_POSTS[1].reactions = [];

export const INITIAL_DATA = {
  posts: MOCK_POSTS,
  comments: MOCK_COMMENTS,
  reactions: MOCK_REACTIONS,
  users: MOCK_USERS
};