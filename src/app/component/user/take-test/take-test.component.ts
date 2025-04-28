import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/model/score';
import { Test } from 'src/app/model/test';
import { User } from 'src/app/model/user';
import { QuestionResponseService } from 'src/app/service/question-response.service';
import { ScoreServiceService } from 'src/app/service/score-service.service';
import { TestServiceService } from 'src/app/service/test-service.service';

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
  a: string="";
  user: User ={
    userId: 1, // You should get this from your auth service
  } // You should get this from your auth service
    score: Score | undefined;

  constructor(
    private route: ActivatedRoute,
    private testService: TestServiceService,
    private scoreservice:ScoreServiceService,
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
      // First await the response from the score service
      const response = await this.scoreservice.getResponse("hi,answer with one line").toPromise();
      
      console.log("response generated: " + response);
      this.submitted = true;
      this.collectUserAnswers();
      
      // Create a proper score object with actual values
      this.score = new Score({
        name: 'Test',
        result: response || 'default_result', // Use the actual response or a default
        score_type: 'Test',
        user: {userId:1},
        date: new Date(),
      });
      // Save the score
      await this.scoreservice.saveScore(this.score).toPromise();
      console.log('Score saved successfully');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately (show to user, etc.)
    }
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
