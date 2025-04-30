import { Component, OnDestroy, OnInit } from '@angular/core';
import { AiModel } from 'src/app/models/quizz/ai-model';
import { Score, User } from 'src/app/models/quizz/score';
import { ScoreServiceService } from 'src/app/Services/quizz/services/score-service.service';
import { UserService } from 'src/app/Services/user/user.service';
@Component({
  selector: 'app-combat-game',
  templateUrl: './combat-game.component.html',
  styleUrls: ['./combat-game.component.css']
})
export class CombatGameComponent implements OnInit, OnDestroy {
  symbols: string[] = ['😀', '😀', '🎉', '🎉', '🚀', '🚀', '🌟', '🌟', '❤️', '❤️', '⚡', '⚡', '🎵', '🎵', '🎯', '🎯'];
  shuffledSymbols: string[] = [];
  cards: Card[] = [];
  selectedCards: Card[] = [];
  matchedPairs: number = 0;
  gameStarted: boolean = false;
  gameCompleted: boolean = false;
  timeElapsed: number = 0;
  private timerInterval: any;
  finalScore: number = 0;
  bestScore: number | null = null;
  prompt:string | undefined;
  user!: User;
  score: Score | undefined;
  ai:AiModel={
    model:"llama2",
    prompt:"how are you?"
  };

  constructor(private scoreservice: ScoreServiceService,private UserService: UserService) {}

  ngOnInit(): void {
    this.getuser();
    this.initializeGame();
    // Load best score from localStorage
    const savedScore = localStorage.getItem('memoryGameBestScore');
    this.bestScore = savedScore ? parseInt(savedScore) : null;

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

  ngOnDestroy(): void {
    this.clearTimer();
  }

  initializeGame(): void {
    this.shuffledSymbols = [...this.symbols].sort(() => Math.random() - 0.5);
    this.cards = this.shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol,
      isHidden: true,
      isMatched: false
    }));
    this.selectedCards = [];
    this.matchedPairs = 0;
    this.gameStarted = false;
    this.gameCompleted = false;
    this.timeElapsed = 0;
    this.clearTimer();
  }

  startGame(): void {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startTimer();
    }
  }

  startTimer(): void {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
  }

  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  handleCardClick(card: Card): void {
    if (!this.gameStarted) {
      this.startGame();
    }

    if (!card.isHidden || card.isMatched || this.selectedCards.length >= 2) {
      return;
    }

    card.isHidden = false;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      setTimeout(() => this.checkMatch(), 500);
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.selectedCards;

    if (card1.symbol === card2.symbol) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.matchedPairs++;
      this.playSound('success');

      if (this.matchedPairs === this.symbols.length / 2) {
        this.gameCompleted = true;
        this.clearTimer();
        this.calculateScore();
      }
    } else {
      card1.isHidden = true;
      card2.isHidden = true;
      this.playSound('failure');
    }

    this.selectedCards = [];
  }

  calculateScore(): void {
    // Base score is 1000, minus 10 points for each second taken
    this.finalScore = Math.max(0, 1000 - (this.timeElapsed * 10));

    // Update best score if current score is better
    if (this.bestScore === null || this.finalScore > this.bestScore) {
      this.bestScore = this.finalScore;
      localStorage.setItem('memoryGameBestScore', this.bestScore.toString());
    }

    this.saveScore();
    console.log('Final Score:', this.finalScore);
  }


  saveScore(): void {
    this.scoreservice.getResponse("this user finish a memory game of 16 cards in 2 minutes what you think about that?").subscribe(
      {
        next: (response) => {
          this.prompt=response;
          console.log('Response:', response);
          // Handle the response
        },
        error: (err) => {
          console.error('Error:', err);
        }
      }
    );

    if (this.finalScore > 0) {
      this.score = new Score({
        name: 'Memory Game',
        result: this.finalScore.toString(),
        score_type: 'Game',
        user: this.user,
        date: new Date(),
      });
      this.scoreservice.saveScore(this.score).subscribe(
        () => {
          console.log('Score saved successfully');
        },
        (error) => {
          console.error('Error saving score:', error);
        }
      );
    }
  }



  playSound(type: 'success' | 'failure'): void {
    // Implement sound playing logic here
    console.log(`Playing ${type} sound`);
  }

  resetGame(): void {
    this.initializeGame();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}

interface Card {
  id: number;
  symbol: string;
  isHidden: boolean;
  isMatched: boolean;
}


