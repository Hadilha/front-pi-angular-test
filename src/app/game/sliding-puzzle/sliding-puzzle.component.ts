import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliding-puzzle',
  templateUrl: './sliding-puzzle.component.html',
  styleUrls: ['./sliding-puzzle.component.css']
})
export class SlidingPuzzleComponent implements OnInit {
  tiles: (number | string)[] = [];
  moveCount = 0;
  seconds = 0;
  timer: any;
  isPlaying = false;

  ngOnInit(): void {
    this.createTiles();
  }

  createTiles(): void {
    this.tiles = [];
    for (let i = 1; i <= 15; i++) {
      this.tiles.push(i);
    }
    this.tiles.push("");
  }

  moveTile(index: number): void {
    if (!this.isPlaying) return;

    const emptyIndex = this.tiles.indexOf("");
    const validMoves = [index - 1, index + 1, index - 4, index + 4];

    if (validMoves.includes(emptyIndex)) {
      if (
        (index % 4 === 0 && emptyIndex === index - 1) ||
        (index % 4 === 3 && emptyIndex === index + 1)
      ) {
        return;
      }

      [this.tiles[index], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[index]];
      this.moveCount++;
      this.checkWin();
    }
  }

  shuffleTiles(): void {
    this.moveCount = 0;
    this.seconds = 0;
    clearInterval(this.timer);
    
    do {
      for (let i = this.tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
      }
    } while (!this.isSolvable(this.tiles));

    this.startTimer();
    this.isPlaying = true;
  }

  restartGame(): void {
    this.createTiles();
    this.moveCount = 0;
    this.seconds = 0;
    clearInterval(this.timer);
    this.isPlaying = false;
  }

  startTimer(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  get formattedTime(): string {
    const mins = String(Math.floor(this.seconds / 60)).padStart(2, "0");
    const secs = String(this.seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  isSolvable(arr: (number | string)[]): boolean {
    let invCount = 0;
    const nums = arr.filter(n => n !== "") as number[];
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] > nums[j]) invCount++;
      }
    }
    const emptyRow = Math.floor(arr.indexOf("") / 4);
    return (invCount + emptyRow) % 2 === 0;
  }

  checkWin(): void {
    for (let i = 0; i < 15; i++) {
      if (this.tiles[i] !== i + 1) return;
    }
    clearInterval(this.timer);
    this.isPlaying = false;
  }

  get isWin(): boolean {
    for (let i = 0; i < 15; i++) {
      if (this.tiles[i] !== i + 1) return false;
    }
    return true;
  }
}