import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoiceServiceService } from '../../../Services/choice-service.service';
import { QuestionServiceService } from '../../../Services/question-service.service';
import { Choice } from '../../../model/choice';
import { Question } from '../../../model/question';

@Component({
  selector: 'app-choice-form',
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.css']
})
export class ChoiceFormComponent implements OnInit {
  choice: Choice = {
    choice_id: 0,
    text: '',
    correct: false,
    quizzQuestion: undefined
  };
  
  isEditMode = false;
  quizId: number | undefined;
  questionId: number | undefined;
  isLoading = false;
  question: Question | null = null;

  constructor(
    private choiceService: ChoiceServiceService,
    private questionService: QuestionServiceService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['quizId'];
      this.questionId = +params['questionId'];
      
      if (params['choiceId']) {
        this.isEditMode = true;
        this.choice.choice_id = +params['choiceId'];
        // For edit mode, we'll assume the choice data is passed via state or will be fetched differently
        // For this example, we'll initialize with empty values
      }
      
      this.loadQuestion(this.questionId);
    });
  }

  loadQuestion(id: number): void {
    this.questionService.getQuestionById(id).subscribe(
      (question) => {
        this.question = question;
        // If in edit mode and choices exist on question, find our choice
        if (this.isEditMode && this.question?.choices) {
          const existingChoice = this.question.choices.find(c => c.choice_id === this.choice.choice_id);
          if (existingChoice) {
            this.choice = { ...existingChoice };
          }
        }
      },
      (error) => {
        console.error('Error loading question:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.choice.text.trim()) {
      alert('Choice text is required');
      return;
    }

    this.isLoading = true;
    const choiceData: Choice = {
      ...this.choice,
      quizzQuestion: { qq_id: this.questionId } as Question
    };

    if (this.isEditMode) {
      // Update existing choice - using createChoice as update (assuming API handles it)
      this.choiceService.updateChoice(this.choice.choice_id!,choiceData).subscribe({
        next: () => {
          this.router.navigate(['/admin/quizzes', this.quizId]);
        },
        error: (error) => {
          console.error('Error updating choice:', error);
          this.isLoading = false;
        }
      });
    } else {
      // Create new choice
      this.choiceService.createChoice(choiceData).subscribe({
        next: () => {
          this.router.navigate(['/admin/quizzes', this.quizId]);
        },
        error: (error) => {
          console.error('Error creating choice:', error);
          this.isLoading = false;
        }
      });
    }
  }
  goToQuizDetails(quizId: number) {
    this.router.navigate(['/admin/quizzes', quizId]);
  }

  onCancel(): void {
    this.router.navigate(['/admin/quizzes', this.quizId]);
  }
}