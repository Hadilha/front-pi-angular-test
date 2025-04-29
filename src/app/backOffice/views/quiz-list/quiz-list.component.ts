import { Component, OnInit } from '@angular/core';
import { QuizzServiceService } from '../../../Services/quizz-service.service';
import { Quizz } from '../../../model/quizz';



@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quizz[] = [];
  isLoading = true;
  show=false;
  info!: string;

  constructor(private quizService: QuizzServiceService,) { }

  

  ngOnInit(): void {
    this.loadQuizzes();
  }
  

  showButton() {
    this.show = !this.show;
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading quizzes:', error);
        
      }
    );
  }

  deleteQuiz(id: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuizz(id).subscribe(
        () => {
          this.quizzes = this.quizzes.filter(quiz => quiz.quizz_id !== id);
        },
        (error) => {
          console.error('Error deleting quiz:', error);
        }
      );
    }
  }



}