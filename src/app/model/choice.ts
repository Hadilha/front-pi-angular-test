import { Question } from './question';

export class Choice {
  choice_id?: number;
  text: string;
  correct: boolean;
  quizzQuestion?: Question;

  constructor(data: any = {}) {
    this.text = data.text || '';
    this.correct = data.correct || false;
    this.quizzQuestion = data.quizzQuestion ? new Question(data.quizzQuestion) : undefined;
  }
}

