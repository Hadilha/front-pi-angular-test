import { Quizz } from './quizz';
import { Choice } from './choice';

export class Question {
  qq_id: number;
  questionText: string;
  quizz?: Quizz;
  choices?: Choice[];

  constructor(data: any = {}) {
    this.qq_id = data.qq_id ;
    this.questionText = data.questionText || '';
    this.quizz = data.quizz ? new Quizz(data.quizz) : undefined;
    this.choices = data.choices ? data.choices.map((c: any) => new Choice(c)) : [];
  }
}

/*export class QuestionForm {
  questionText?: string;
  quizz: Quizz | undefined;
  choices?: Choice[];

  constructor(data: any = {}) {
    this.questionText = data.questionText || '';
    this.quizz = data.quizz || undefined;
  }
}*/