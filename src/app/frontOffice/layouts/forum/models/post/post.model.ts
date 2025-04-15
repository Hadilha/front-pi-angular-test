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