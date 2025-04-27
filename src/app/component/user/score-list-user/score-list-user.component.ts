import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/model/score';
import { ScoreServiceService } from 'src/app/Services/score-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-score-list-user',
  templateUrl: './score-list-user.component.html',
  styleUrls: ['./score-list-user.component.css']
})
export class ScoreListUserComponent implements OnInit {
  scores: Score[] = []; // Replace 'any' with the actual type if you have one
  isLoading = true;
  time: number = 0;
  user: User = {
    id: 1,
    username: 'BsisaBnina',
    email: 'test_user@esprit.tn',
    password: '12345678',
  };

  userScores: Score[] = [];

  constructor(private scoreService: ScoreServiceService) { }

  ngOnInit(): void {
    this.loadScores();
    this.loadScoresByUserId(this.user.id);
  }

  loadScores(): void {
    // Simulate an API call to fetch scores
    setTimeout(() => {
      this.scoreService.getAllScores().subscribe(
        (scores) => {
          this.scores = scores;
          
    }); 
      this.isLoading = false;
    },3000);
  }

  getTime(): void {
    setTimeout(() => {
      this.time = this.time + 1;
      this.getTime();
    }, 1000);
  }

  loadScoresByUserId(userId: number): void {
    this.scoreService.getScoreByUserId(userId).subscribe(
      (scores) => {
        this.userScores = scores;
        console.table(this.userScores);
      },
      (error) => {
        console.error('Error loading scores:', error);
      }
    );
  }

}
