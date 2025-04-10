import { User } from './user';
export class Score {
    score_id: number;
    date: Date;
    name: string;
    user?: User;
    result?: number;
    score_type: string;
  
    constructor(data: any = {}) {
      this.score_id = data.score_id || 0;
      this.date = data.date ? new Date(data.date) : new Date();
      this.user = data.user ? new User(data.user.id, data.user.username, data.user.email, data.user.password) : undefined;
      this.result = data.result || undefined;
      this.score_type = data.score_type ;
      this.name = data.name || '';
      
    }
  }
  
  
