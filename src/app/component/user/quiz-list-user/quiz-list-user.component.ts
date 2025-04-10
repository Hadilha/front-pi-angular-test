import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Choice } from 'src/app/model/choice';
import { Quizz } from 'src/app/model/quizz';
import { ChoiceServiceService } from 'src/app/service/choice-service.service';
import { QuizzServiceService } from 'src/app/service/quizz-service.service';

@Component({
  selector: 'app-quiz-list-user',
  templateUrl: './quiz-list-user.component.html',
  styleUrls: ['./quiz-list-user.component.css']
})
export class QuizListUserComponent implements OnInit {

  quizzes: Quizz[] = [];
  choice: Choice [] = [];
    isLoading = true;
  router: any;
  
    constructor(private quizService: QuizzServiceService,private choiceService: ChoiceServiceService,private http: HttpClient) { }
  
    ngOnInit(): void {
      this.loadQuizzes();
      this.loadCoice();
    }
  
    loadQuizzes(): void {
      this.quizService.getAllQuizzes().subscribe(
        (quizzes) => {
          this.quizzes = quizzes;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading quizzes:', error);
          this.isLoading = false;
        }
      );
    }

    loadCoice():void{
      this.choiceService.getAllChoices().subscribe(
        (choice) => {
          this.choice = choice;
          console.table(this.choice);
        },
        (error) => {
          console.error('Error loading choices:', error);
          this.isLoading = false;
        }
      );
    }

    takeQuiz(id:number): void {
      this.router.navigate(['/test', id]);
    }

}
