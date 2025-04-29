import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quizz } from '../../../model/quizz';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzServiceService } from '../../../Services/quizz-service.service';
import { ScoreServiceService } from '../../../Services/score-service.service';
import { Question } from '../../../model/question';
import { Score } from '../../../model/score';
import { Choice } from '../../../model/choice';
import { User } from 'src/app/model/user';
import { ChoiceServiceService } from 'src/app/Services/choice-service.service';

@Component({
  selector: 'app-quizz-test',
  templateUrl: './quizz-test.component.html',
  styleUrls: ['./quizz-test.component.css']
})
export class QuizTestComponent implements OnInit, OnDestroy {
  choices: Choice[] = [];
  quiz: Quizz | null = null;
  currentQuestionIndex = 0;
  selectedChoiceId: number | null = null;
  isCorrect!: boolean;
  score = 0;
  timeLeft: number = 300; // 5 minutes in seconds
  timerSubscription: Subscription | null = null;
  isLoading = true;
  Loading = true;
  quizCompleted = false;
  answers:string = "This person choose these answers: ";
  userId: User={
    id: 1, // You should get this from your auth service
  } // You should get this from your auth service
  user: number = 1; // You should get this from your auth service

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizzServiceService,
    private scoreService: ScoreServiceService,
    private choiceService: ChoiceServiceService,
    //private userService: UserService
  ) {}

  ngOnInit(): void {
    
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.loadQuiz(+quizId);
    } else {
      this.router.navigate(['/admin/quizzes']);
    }
    this.loadScores();
    // Start timer
    this.startTimer();
  }

  loadScores(): void {
    // Simulate an API call to fetch scores
    setTimeout(() => {
      this.scoreService.getAllScores().subscribe(
        (scores) => {
          console.log(scores);
          
    }); 
      this.Loading = false;
    },3000);
    this.timerSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadQuiz(id: number): void {
    this.quizService.getQuizzById(id).subscribe(
      (quiz) => {
        this.quiz = quiz;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading quiz:', error);
        this.isLoading = false;
      }
    );
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finishQuiz();
      }
    });
  }

  // Add this to your component class
get timerPercentage(): number {
  return (this.timeLeft / 300) * 100; // 300 is your initial time in seconds
}

get currentQuestion(): Question | null {
  if (this.quiz?.questions && this.quiz.questions.length > this.currentQuestionIndex) {
    return this.quiz.questions[this.currentQuestionIndex];
  }
  return null;
}

  selectChoice(choiceId: number): void {
    this.selectedChoiceId = choiceId;
    console.log('Selected choice ID:', this.selectedChoiceId);
  }

  stockanswer(id:number): void {
    this.choiceService.getChoiceById(id).subscribe(
      (choice) => {
        this.answers += choice.text + " ";
        console.log('ansewer:', this.answers);
      }
    );
  }

  selectCorrect(correct: boolean,choiceId:number): void {
    this.isCorrect = correct;
    this.selectedChoiceId = choiceId;
    console.log('Selected choice ID:', this.selectedChoiceId);
    console.log('Is correct:', this.isCorrect);
  }

  nextQuestion(): void {
    if (!this.currentQuestion || this.selectedChoiceId === null) {
      alert('Please select an answer before proceeding');
      return;
    }
    const selectedChoice = this.currentQuestion.choices?.find(c => c.choice_id === this.selectedChoiceId);
    if (this.isCorrect) {
      console.log('Correct answer!');
      this.score++;
    }
  
    this.stockanswer(this.selectedChoiceId);
  
    if (this.quiz && this.currentQuestionIndex < (this.quiz.questions?.length ?? 0) - 1) {
      this.currentQuestionIndex++;
      this.selectedChoiceId = null;
    } else {
      this.finishQuiz();
      console.log(this.score * 100 / (this.quiz?.questions?.length ?? 1));
    }
  }

  finishQuiz(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.quizCompleted = true;
    this.saveScore();
  }

  saveScore(): void {
    if (!this.quiz) return;

    // Calculate score percentage
    const totalQuestions = this.quiz.questions?.length || 1;
    const percentage = (this.score / totalQuestions) * 100;


    const scoreData = new Score({
      name: this.quiz?.title,
      result: percentage.toString(),
      score_type: "Quiz",
      user: {id:2},
      date: new Date(),
    });

    this.scoreService.saveScore(scoreData).subscribe(
      () => {
        console.log('Score saved successfully');
      },
      (error) => {
        console.error('Error saving score:', error);
      }
    );
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  containsSubstring(text: string, substring: string): boolean {
    return text.includes(substring);
  }
}
