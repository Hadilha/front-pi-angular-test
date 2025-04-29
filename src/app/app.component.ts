import { Component, OnInit } from '@angular/core';
import { Score } from './model/score';
import { ScoreServiceService } from './Services/score-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  score: Score | undefined;

  constructor(private scoreservice : ScoreServiceService){}


  ngOnInit(): void {
    
  }

  saveScore(): void {
    this.scoreservice.saveScore(new Score({
      name: 'Test',
      result: 'default_result', 
      score_type: 'Test',
     user: {id: 2},
      date: new Date(),
    })).subscribe(
      (response) => {
        console.log('Score saved successfully:', response);
      },
    (error) => {
        console.error('Error saving score:', error);
      }
    );
  }
  
}
