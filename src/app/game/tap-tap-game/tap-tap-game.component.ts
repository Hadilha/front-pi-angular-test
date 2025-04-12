import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tap-tap-game',
  templateUrl: './tap-tap-game.component.html',
  styleUrls: ['./tap-tap-game.component.css']
})
export class TapTapGameComponent implements OnInit {
  score: number = 0;
  moleHits: number = 0;
  holeMisses: number = 0;
  totalMoles: number = 5;
  totalHoles: number = 5;
  gameActive: boolean = false;
  showWinModal: boolean = false;
  showLossModal: boolean = false;
  showHelpModal: boolean = false;

  // Mole states
  moles = [
    { id: 0, active: false, position: 'far-right' },
    { id: 1, active: false, position: 'center-right' },
    { id: 2, active: false, position: 'center' },
    { id: 3, active: false, position: 'center-left' },
    { id: 4, active: false, position: 'far-left' }
  ];

  // Hole states
  holes = [
    { id: 0, damaged: false, position: 'far-left' },
    { id: 1, damaged: false, position: 'center-left' },
    { id: 2, damaged: false, position: 'center' },
    { id: 3, damaged: false, position: 'center-right' },
    { id: 4, damaged: false, position: 'far-right' }
  ];

  private gameInterval: any;
  private moleInterval: any;

  ngOnInit(): void {
    // Initialize game state
    this.resetGame();
  }

  startGame(): void {
    this.gameActive = true;
    this.resetGame();
    
    // Start mole popping at random intervals
    this.moleInterval = setInterval(() => {
      this.popRandomMole();
    }, 1000);
    
    // Game duration (60 seconds)
    this.gameInterval = setTimeout(() => {
      this.endGame();
    }, 60000);
  }

  popRandomMole(): void {
    if (!this.gameActive) return;
    
    // Find inactive moles
    const inactiveMoles = this.moles.filter(mole => !mole.active);
    if (inactiveMoles.length === 0) return;
    
    // Choose a random mole to pop up
    const randomIndex = Math.floor(Math.random() * inactiveMoles.length);
    const mole = inactiveMoles[randomIndex];
    mole.active = true;
    
    // Mole stays up for 1-2 seconds
    setTimeout(() => {
      mole.active = false;
    }, 1000 + Math.random() * 1000);
  }

  whackMole(moleId: number): void {
    if (!this.gameActive) return;
    
    const mole = this.moles.find(m => m.id === moleId);
    if (mole && mole.active) {
      this.score += 10;
      this.moleHits++;
      mole.active = false;
      
      // Check for win condition (optional)
      if (this.moleHits >= this.totalMoles * 3) {
        this.showWinModal = true;
        this.gameActive = false;
        clearInterval(this.moleInterval);
        clearTimeout(this.gameInterval);
      }
    }
  }

  missHole(holeId: number): void {
    if (!this.gameActive) return;
    
    const hole = this.holes.find(h => h.id === holeId);
    if (hole && !hole.damaged) {
      this.score = Math.max(0, this.score - 5);
      this.holeMisses++;
      hole.damaged = true;
      
      // Check for loss condition
      if (this.holeMisses >= this.totalHoles) {
        this.showLossModal = true;
        this.gameActive = false;
        clearInterval(this.moleInterval);
        clearTimeout(this.gameInterval);
      }
    }
  }

  endGame(): void {
    this.gameActive = false;
    clearInterval(this.moleInterval);
    
    // Show appropriate modal based on score
    if (this.score > 100) {
      this.showWinModal = true;
    } else {
      this.showLossModal = true;
    }
  }

  resetGame(): void {
    this.score = 0;
    this.moleHits = 0;
    this.holeMisses = 0;
    this.showWinModal = false;
    this.showLossModal = false;
    
    // Reset all moles
    this.moles.forEach(mole => mole.active = false);
    
    // Reset all holes
    this.holes.forEach(hole => hole.damaged = false);
    
    // Clear any existing intervals
    clearInterval(this.moleInterval);
    clearTimeout(this.gameInterval);
  }

  toggleHelp(): void {
    this.showHelpModal = !this.showHelpModal;
    this.gameActive = !this.showHelpModal;
  }
}
