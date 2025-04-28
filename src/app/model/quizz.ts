import { Question } from './question';

export class Quizz {
  quizz_id?: number;
  title: string;
  description: string;
  image: string;
  questions?: Question[];

  constructor(data: any = {}) {
    this.title = data.title || '';
    this.image = data.image || '';
    this.description = data.description || '';
    this.questions = data.questions ? data.questions.map((q: any) => new Question(q)) : [];
  }
}

/*export class QuizForm {
  title: string;
  description?: string ;
  image?: string;

  constructor(data: any = {}) {
    this.title = data.title || '';
  }
}*/