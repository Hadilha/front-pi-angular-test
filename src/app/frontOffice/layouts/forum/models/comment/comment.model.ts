export interface Comment {
    id: number;
    content: string;
    author: {
      id: number;
      name: string;
    };
    createdAt: string;
  }
  