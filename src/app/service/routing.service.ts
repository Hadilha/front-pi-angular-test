import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  router: any;

  constructor() {}

  //quizz routing
  goToEditQuiz(quizId: number) {
    this.router.navigate(['/quizzes/edit', quizId]);
  }
  goToQuizDetails(quizId: number) {
    this.router.navigate(['/quizzes', quizId]);
  }
  goToAdminQuizList() {
    this.router.navigate(['/quizzes']);
  }
  goToUserUserQuizList() {
    this.router.navigate(['/quizzeslist']);
  }
  goToQuizForm() {
    this.router.navigate(['/quizzes/new']);
  }

  //question routing
  goToEditQuestion(quizId: number,questionId:number) {
    this.router.navigate(['/quizzes', quizId, 'questions', questionId, 'edit']);
  }
  goToQuestionForm(quizId: number) {
    this.router.navigate(['/quizzes', quizId, 'questions', 'new']);
  }

  //choice routing
  goToChoiceForm(quizId: number,questionId:number) {
    this.router.navigate(['/quizzes', quizId, 'questions', questionId, 'choices', 'new']);
  }
  goToEditChoice(quizId: number,questionId:number,choice_id:number) {
    this.router.navigate(['/quizzes', quizId, 'questions', questionId, 'choices', choice_id, 'edit']);
  }

  //quiz test routing
  goToQuizTest(quizId: number) {
    this.router.navigate(['/test', quizId]);
  }
  //score routing
  goToUserScoreList() {
    this.router.navigate(['/scorelist']);
  }
  
}
