import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/quizz/question';
import { Quizz } from 'src/app/models/quizz/quizz';
import { QuestionServiceService } from 'src/app/Services/quizz/services/question-service.service';
import { QuizzServiceService } from 'src/app/Services/quizz/services/quizz-service.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  isEditMode = false;
  quizId: number | null = null;
  questionId: number | null = null;
  isLoading = false;
  quiz: Quizz | null = null;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionServiceService,
    private quizService: QuizzServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      text: [true],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['quizId'];
      this.loadQuiz(this.quizId);

      if (params['questionId']) {
        this.isEditMode = true;
        this.questionId = +params['questionId'];
        this.loadQuestion(this.questionId);
      }
    });
  }

  loadQuiz(id: number): void {
    this.quizService.getQuizzById(id).subscribe(
      (quiz) => {
        this.quiz = quiz;
      },
      (error) => {
        console.error('Error loading quiz:', error);
      }
    );
  }

  loadQuestion(id: number): void {
    this.isLoading = true;
    this.questionService.getQuestionById(id).subscribe(
      (question) => {
        this.questionForm.patchValue({
          questionText: question.questionText,
          text: question.text
        });
        console.table(question);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading question:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.questionForm.valid && this.quizId) {
      this.isLoading = true;
      const questionData: Question = this.questionForm.value;
      questionData.quizz = { quizz_id: this.quizId } as Quizz;

      if (this.isEditMode && this.questionId) {
        questionData.qq_id = this.questionId;
        this.questionService.updateQuestion(this.questionId,questionData).subscribe( // Changed to updateQuestion
          () => {
            this.isLoading = false;
            this.router.navigate(['/admin/quizzes', this.quizId]);
          },
          (error) => {
            console.error('Error updating question:', error);
            this.isLoading = false;
          }
        );
      } else {
        this.questionService.createQuestion(questionData).subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/admin/quizzes', this.quizId]);
          },
          (error) => {
            console.error('Error creating question:', error);
            this.isLoading = false;
          }
        );
      }
    }
  }

  public onCancel(): void {
    this.router.navigate(['/admin/quizzes', this.quizId]);
  }
}
