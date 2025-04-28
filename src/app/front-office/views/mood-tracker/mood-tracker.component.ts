import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { NLPService, UserActivity, Program, AppUser, Goal, Achievement } from 'src/app/core/services/NLP.service';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MoodTrackerComponent implements OnInit {
  userId: number = 1;
  mood: string = '';
  intensity: number = 1;
  notes: string = '';
  moods: UserActivity[] = [];
  recommendedProgram: Program | null = null;
  isLoadingRecommendation: boolean = false;
  moodsList: string[] = ['Happy', 'Sad', 'Anxious', 'Stressed', 'Excited', 'Calm', 'Angry'];
  moodIcons: { [key: string]: string } = {
    Happy: '😊',
    Sad: '😢',
    Anxious: '😟',
    Stressed: '😓',
    Excited: '🎉',
    Calm: '🧘',
    Angry: '😡'
  };
  errorMessage: string = '';
  darkMode: boolean = false;
  goals: Goal[] = [];
  newGoal: string = '';
  goalErrorMessage: string = '';
  achievements: Achievement[] = [];

  constructor(private apiService: NLPService) {}

  ngOnInit(): void {
    this.loadMoods();
    this.loadRecommendation();
    this.loadGoals();
    this.loadAchievements();
    const savedTheme = localStorage.getItem('darkMode');
    this.darkMode = savedTheme === 'true';
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  logMood(): void {
    if (!this.mood || !this.notes) {
      this.errorMessage = 'Mood and notes are required.';
      return;
    }

    this.errorMessage = '';
    this.apiService.logMoodEntry(this.userId, this.mood, this.intensity, this.notes).subscribe({
      next: (response: UserActivity) => {
        this.moods.push(response);
        this.mood = '';
        this.intensity = 1;
        this.notes = '';
        this.loadRecommendation();
        this.loadGoals();
        this.loadAchievements();
      },
      error: (err: any) => {
        console.error('Failed to log mood', err);
        this.errorMessage = 'Failed to log mood. Please try again.';
      }
    });
  }

  loadMoods(): void {
    this.apiService.getMoodEntries(this.userId).subscribe({
      next: (moods: UserActivity[]) => this.moods = moods,
      error: (err: any) => console.error('Failed to load moods', err)
    });
  }

  loadRecommendation(): void {
    this.isLoadingRecommendation = true;
    this.apiService.getRecommendedProgram(this.userId).subscribe({
      next: (program: Program) => {
        this.recommendedProgram = program;
        this.isLoadingRecommendation = false;
      },
      error: (err: any) => {
        console.error('Failed to load recommendation', err);
        this.isLoadingRecommendation = false;
      }
    });
  }

  setGoal(): void {
    if (!this.newGoal.trim()) {
      this.goalErrorMessage = 'Goal description is required.';
      return;
    }

    this.goalErrorMessage = '';
    this.apiService.setGoal(this.userId, this.newGoal).subscribe({
      next: (goal: Goal) => {
        this.goals.push(goal);
        this.newGoal = '';
        this.loadGoals();
      },
      error: (err: any) => {
        console.error('Failed to set goal', err);
        this.goalErrorMessage = 'Failed to set goal. Please try again.';
      }
    });
  }

  loadGoals(): void {
    this.apiService.getGoals(this.userId).subscribe({
      next: (goals: Goal[]) => this.goals = goals,
      error: (err: any) => console.error('Failed to load goals', err)
    });
  }

  completeGoal(goalId: number): void {
    this.apiService.completeGoal(goalId).subscribe({
      next: (updatedGoal: Goal) => {
        const index = this.goals.findIndex(g => g.id === goalId);
        if (index !== -1) {
          this.goals[index] = updatedGoal;
        }
        this.loadAchievements();
      },
      error: (err: any) => console.error('Failed to complete goal', err)
    });
  }

  loadAchievements(): void {
    this.apiService.getAchievements(this.userId).subscribe({
      next: (achievements: Achievement[]) => this.achievements = achievements,
      error: (err: any) => console.error('Failed to load achievements', err)
    });
  }
}