import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz } from 'src/app/models/quizz/quizz';
import { QuizzServiceService } from 'src/app/Services/quizz/services/quizz-service.service';


@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {
  quizForm: FormGroup;
  isEditMode = false;
  quizId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizzServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.quizId = +params['id'];
        this.loadQuiz(this.quizId);
      }
    });
  }

  loadQuiz(id: number): void {
    this.isLoading = true;
    this.quizService.getQuizzById(id).subscribe(
      (quiz) => {
        this.quizForm.patchValue({
          title: quiz.title,
          description: quiz.description,
          image: quiz.image
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading quiz:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      this.isLoading = true;
      const quizData: Quizz = this.quizForm.value;

      if (this.isEditMode && this.quizId) {
        quizData.quizz_id = this.quizId;
        this.quizService.updateQuizz(quizData).subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/admin/quizzes', this.quizId]);
          },
          (error) => {
            console.error('Error updating quiz:', error);
            this.isLoading = false;
          }
        );
      } else {
        this.quizService.addQuiz(quizData).subscribe(
          (newQuiz) => {
            this.isLoading = false;
            this.router.navigate(['/admin/quizzes', newQuiz.quizz_id]);
          },
          (error) => {
            console.error('Error creating quiz:', error);
            this.isLoading = false;
          }
        );
      }
    }
  }

  public navigateToHome(): void {
    this.router.navigate(['/admin/quizzes']);
  }
}
