export class User {
  id: number;// You might want to create a Calendar interface if needed

  constructor(data: any = {}) {
      this.id = data.id ;
  }

  // For compatibility with the Java getName() method
  
}

export class Score {
    date: Date;
    name?: string;
    result?: string;
    score_type: string;
    user?: User;  // Changed from 'id' to 'user'
  
    constructor(data: any = {}) {
      this.date = data.date ? new Date(data.date) : new Date();
      this.name = data.name || '';
      this.result = data.result || '';
      this.score_type = data.score_type || '';
      this.user = data.user ? new User(data.user) : undefined;
    }
  }