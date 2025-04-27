// quiz-analytics.component.ts
import { Component, OnInit } from '@angular/core';
import { QuizzServiceService } from '../../../Services/quizz-service.service';
import { QuestionServiceService } from '../../../Services/question-service.service';
import { ChoiceServiceService } from 'src/app/Services/choice-service.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {
  loading = true;
  activeTab: 'quizzes' | 'questions' | 'choices' = 'quizzes';
  
  // Quiz visualization data
  quizChartData: any;
  quizChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Quiz Statistics' },
      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } }
    },
    scales: { y: { min: 0, max: 100 } }
  };

  // Question visualization data
  questionChartData: any;
  questionChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Question Difficulty' },
    }
  };

  // Choice visualization data
  choiceChartData: any;
  choiceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Choice Selection Rates' },
    }
  };

  // Summary statistics
  stats = {
    totalQuizzes: 0,
    totalQuestions: 0,
    avgQuestionsPerQuiz: 0,
    mostPopularQuiz: '',
    hardestQuestion: '',
    easiestQuestion: '',
    mostSelectedChoice: ''
  };

  constructor(
    private quizService: QuizzServiceService,
    private questionService: QuestionServiceService,
    private choiceService: ChoiceServiceService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;
    
    // Load all data in parallel
    Promise.all([
      this.quizService.getAllQuizzes().toPromise(),
      this.questionService.getAllQuestions().toPromise(),
      this.choiceService.getAllChoices().toPromise()
    ]).then(([quizzes, questions, choices]) => {
      this.processQuizData(quizzes || []);
      this.processQuestionData(questions || []);
      this.processChoiceData(choices || []);
      this.calculateSummaryStats(quizzes || [], questions || [], choices || []);
    }).finally(() => {
      this.loading = false;
    });
  }

  processQuizData(quizzes: any[]): void {
    // Mock data - in real app you'd calculate based on scores
    const quizParticipation = quizzes.map(quiz => ({
      name: quiz.title,
      value: Math.floor(Math.random() * 100) // Random participation percentage
    }));

    this.quizChartData = {
      labels: quizParticipation.map(q => q.name),
      datasets: [{
        label: 'Participation Rate (%)',
        data: quizParticipation.map(q => q.value),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  }

  processQuestionData(questions: any[]): void {
    // Mock difficulty levels (would come from score data in real app)
    const questionDifficulty = questions.map(question => ({
      text: question.questionText.substring(0, 30) + (question.questionText.length > 30 ? '...' : ''),
      difficulty: Math.floor(Math.random() * 100) // Random difficulty
    }));

    this.questionChartData = {
      labels: questionDifficulty.map(q => q.text),
      datasets: [{
        label: 'Correct Answer Rate (%)',
        data: questionDifficulty.map(q => q.difficulty),
        backgroundColor: (ctx: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value > 70 ? 'rgba(75, 192, 192, 0.5)' : 
                 value > 40 ? 'rgba(255, 206, 86, 0.5)' : 
                 'rgba(255, 99, 132, 0.5)';
        },
        borderColor: (ctx: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) => {
          const value = ctx.dataset.data[ctx.dataIndex] as number;
          return value > 70 ? 'rgba(75, 192, 192, 1)' : 
                 value > 40 ? 'rgba(255, 206, 86, 1)' : 
                 'rgba(255, 99, 132, 1)';
        },
        borderWidth: 1
      }]
    };
  }

  processChoiceData(choices: any[]): void {
    // Mock selection rates (would come from answer logs in real app)
    const choiceSelection = choices.map(choice => ({
      text: choice.text.substring(0, 20) + (choice.text.length > 20 ? '...' : ''),
      selectionRate: Math.floor(Math.random() * 100), // Random selection rate
      isCorrect: choice.correct
    }));

    this.choiceChartData = {
      labels: choiceSelection.map(c => c.text),
      datasets: [{
        label: 'Selection Rate (%)',
        data: choiceSelection.map(c => c.selectionRate),
        backgroundColor: (ctx: { dataset: { data: { [x: string]: number; }; }; dataIndex: number; }) => {
          return choiceSelection[ctx.dataIndex].isCorrect ? 
                 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)';
        },
        borderColor: (ctx: { dataset: { data: { [x: string]: number; }; }; dataIndex: number; }) => {
          return choiceSelection[ctx.dataIndex].isCorrect ? 
                 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
        },
        borderWidth: 1
      }]
    };
  }

  calculateSummaryStats(quizzes: any[], questions: any[], choices: any[]): void {
    this.stats = {
      totalQuizzes: quizzes.length,
      totalQuestions: questions.length,
      avgQuestionsPerQuiz: quizzes.length > 0 ? 
        Math.round((questions.length / quizzes.length) * 10) / 10 : 0,
      mostPopularQuiz: quizzes[0]?.title || 'N/A',
      hardestQuestion: questions[0]?.questionText.substring(0, 50) + 
        (questions[0]?.questionText.length > 50 ? '...' : '') || 'N/A',
      easiestQuestion: questions[questions.length - 1]?.questionText.substring(0, 50) + 
        (questions[questions.length - 1]?.questionText.length > 50 ? '...' : '') || 'N/A',
      mostSelectedChoice: choices[0]?.text.substring(0, 30) + 
        (choices[0]?.text.length > 30 ? '...' : '') || 'N/A'
    };
  }

  changeTab(tab: 'quizzes' | 'questions' | 'choices'): void {
    this.activeTab = tab;
  }
}