import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Choice } from 'src/app/models/quizz/choice';
import { Quizz } from 'src/app/models/quizz/quizz';
import { ChoiceServiceService } from 'src/app/Services/quizz/services/choice-service.service';
import { QuizzServiceService } from 'src/app/Services/quizz/services/quizz-service.service';

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
      this.router.navigate(['/patientspace/test', id]);
    }

    getAIResponse() {
      const headers = new HttpHeaders({
        Authorization: 'Bearer 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',
        'Content-Type': 'application/json',
      });

      const body = {
        model: 'openai/gpt-4o',
        messages: [{ role: 'user', content: "how are you?" }],
      };

      return this.http.post<any>('https://openrouter.ai/api/v1/chat/completions', body, { headers });
    }

}
