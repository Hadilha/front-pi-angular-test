import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzServiceService } from '../../../service/quizz-service.service';
import { QuestionServiceService } from '../../../service/question-service.service';
import { Quizz } from '../../../model/quizz';
import { Question } from '../../../model/question';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizDetailsComponent implements OnInit {
  quiz: Quizz | null = null;
  questions: Question[] = [];
  isLoading = true;
  colapsed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizzServiceService,
    private questionService: QuestionServiceService
  ) { }

  colapsedToggle() {
    this.colapsed = !this.colapsed;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadQuiz(+id);
    }
    
  }

  loadQuiz(id: number): void {
    this.quizService.getQuizzById(id).subscribe(
      (quiz) => {
        this.quiz = quiz;
        this.loadQuestions(id);
      },
      (error) => {
        console.error('Error loading quiz:', error);
        this.isLoading = false;
      }
    );
  }

  loadQuestions(quizId: number): void {
    this.questionService.getAllQuestions().subscribe(
      (questions) => {
        this.questions = questions.filter(q => q.quizz?.quizz_id === quizId);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading questions:', error);
        this.isLoading = false;
      }
    );
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(questionId).subscribe(
        () => {
          this.questions = this.questions.filter(q => q.qq_id !== questionId);
        },
        (error) => {
          console.error('Error deleting question:', error);
        }
      );
    }
    this.loadQuestions(this.quiz?.quizz_id!);
  }

  startQuiz(): void {
    if (this.quiz?.quizz_id) {
      this.router.navigate(['/test', this.quiz.quizz_id]);
    }
  }

  editQuiz(quizId: number) {
    this.router.navigate(['quizzes/edit', quizId]);
  }

  addNewQuestion() {
    // Navigate to the new question form
    if (this.quiz?.quizz_id) {
      this.router.navigate(['/quizzes', this.quiz.quizz_id, 'questions','new']);
    }
  }
  editQuestion(questionId: number, quizId: number) {
    this.router.navigate(['/quizzes', quizId, 'questions', questionId, 'edit']);
  }

  navigateToAddChoice(questionId: number): void {
    this.router.navigate(['/quizzes', this.quiz?.quizz_id, 'questions', questionId, 'choices', 'new']);
  }
  
  navigateToEditChoice(questionId: number, choiceId: number): void {
    console.log('this choice id ',choiceId);
    console.log('this ques id ', questionId);
    console.log('this quizz id ', questionId);
    this.router.navigate(['/quizzes', this.quiz?.quizz_id, 'questions', questionId, 'choices', choiceId, 'edit']);
    
  }
}