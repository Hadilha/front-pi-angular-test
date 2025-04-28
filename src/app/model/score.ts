import { User } from "./user";

export class Score {
    score_id: number;
    date: Date;
    name?: string;
    result?: string;
    score_type: string;
    user?: User;  // Changed from 'id' to 'user'
  
    constructor(data: any = {}) {
      this.score_id = data.score_id || 0;
      this.date = data.date ? new Date(data.date) : new Date();
      this.name = data.name || '';
      this.result = data.result || '';
      this.score_type = data.score_type || '';
      this.user = data.user ? new User(data.user) : undefined;
    }
  }