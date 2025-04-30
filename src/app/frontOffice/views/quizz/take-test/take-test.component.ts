import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score, User } from 'src/app/models/quizz/score';
import { Test } from 'src/app/models/quizz/test';
import { ScoreServiceService } from 'src/app/Services/quizz/services/score-service.service';
import { TestServiceService } from 'src/app/Services/quizz/services/test-service.service';
import { UserService } from 'src/app/Services/user/user.service';


@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent {
  test: Test = new Test();
  userResponses: {[key: number]: string} = {};
  submitted = false;
  answers?:string="";
  allUserAnswers: string="";
    user!: User;

  a: string="";
 // You should get this from your auth service
    score: Score | undefined;

  constructor(
    private route: ActivatedRoute,
    private testService: TestServiceService,
    private scoreservice:ScoreServiceService,
    private UserService: UserService
  ) { }


  ngOnInit(): void {
    const testId = this.route.snapshot.params['id'];
    if (testId) {
      this.testService.getTestById(testId).subscribe(
        (test: Test) => {
          this.test = test;
          // Initialize user responses
          if (this.test.question_response) {
            this.test.question_response.forEach(qr => {
              if (qr.qr_id) {
                this.userResponses[qr.qr_id] = '';
              }
            });
          }
        },
        error => console.error('Error loading test:', error)
      );
    }
    this.getuser();
  }



  async collectUserAnswers(): Promise<void> {
    this.allUserAnswers = "";
    if (this.test.question_response) {
      this.test.question_response.forEach(qr => {
        if (qr.qr_id && this.userResponses[qr.qr_id]) {
          this.allUserAnswers += this.userResponses[qr.qr_id] + ", "
        }
      });
    }
    console.log('All user answers:', this.allUserAnswers); // For debugging
    /*const sentimentResult = await this.analyzeSentiment(this.allUserAnswers);
    this.score = new Score();
    this.score.description = sentimentResult;
    console.log(sentimentResult)*/
    this.scoreservice.getResponse("hi").subscribe(data=>this.a=data);
  }

  async submitTest(): Promise<void> {
    try {
      this.collectUserAnswers();
      // First await the response from the score service
      const response = await this.scoreservice.getResponse(
        "the user submit these answers, can you analyse them and give me a prediction of his sentiments" +
         this.allUserAnswers +
         "answer in just two lines").toPromise();

      console.log("response generated: " + response);
      this.submitted = true;


      // Create a proper score object with actual values
      this.score = new Score({
        name: 'Test',
        result: response ?? 'default_result',  // Use nullish coalescing for better safety
        score_type: 'Test',
        user: this.user, // Ensure this returns the expected user format
        date: new Date()
      });
console.log("this.UserService.getCurrentUser()",this.UserService.getCurrentUser());
      console.log("this.score",this.score);
      // Save the score
      await this.scoreservice.saveScore(this.score).toPromise();
      console.log('Score saved successfully');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately (show to user, etc.)
    }
  }
  getuser(): void {
    this.UserService.getCurrentUser().subscribe({
      next: (currentUser) => {
        this.user = currentUser;
      },
      error: (err) => {
        console.error('Failed to fetch current user photo', err);

      }
    });
  }



  resetTest(): void {
    this.submitted = false;
    Object.keys(this.userResponses).forEach(key => {
      this.userResponses[parseInt(key)] = '';
    });
  }

    async analyzeSentiment(text: string): Promise<any> {
    const url = 'https://text-analysis-classification-summarisation.p.rapidapi.com/api/v1/sentiment_analysis/';

    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'aef1032e49msh9d46f007189dde9p15f3f9jsn879fab779700',
        'x-rapidapi-host': 'text-analysis-classification-summarisation.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sentence: text
      })
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.reasoning;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
