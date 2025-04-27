import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/model/score';
import { Test } from 'src/app/model/test';
import { User } from 'src/app/model/user';
import { QuestionResponseService } from 'src/app/Services/question-response.service';
import { ScoreServiceService } from 'src/app/Services/score-service.service';
import { TestServiceService } from 'src/app/Services/test-service.service';

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
  user: User = {
      id: 1,
      username: 'BsisaBnina',
      email: 'test_user@esprit.tn',
      password: '12345678',
    };
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
  }

  async submitTest(): Promise<void> {
    this.submitted = true;
    this.collectUserAnswers();
    if(this.score?.description!=""){
    this.score = new Score({
      name: 'Test',
      result: 100,
      score_type: 'Test',
      user: this.user,
      date: new Date(),
      description: await this.analyzeSentiment(this.allUserAnswers)
    });
    this.scoreservice.saveScore(this.score).subscribe(
      () => {
        console.log('Score saved successfully');
      },
      (error) => {
        console.error('Error saving score:', error);
      }
    );}
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
