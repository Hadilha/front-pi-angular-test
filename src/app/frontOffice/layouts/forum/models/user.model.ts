export interface User {
    id: number;
    username: string;
    avatarUrl?: string;    // Optional for future UI enhancements
    role?: string;         // Optional for role-based features
    email?: string;        // Optional for user profile
  }