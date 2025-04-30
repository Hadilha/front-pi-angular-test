import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from 'src/app/Services/feedback/feedback.service';


@Component({
  selector: 'app-coach-feedback',
  templateUrl: './coach-feedback.component.html',
  styleUrls: ['./coach-feedback.component.css']
})
export class CoachFeedbackComponent implements OnInit {
  feedbackList: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private feedbackService: FeedbackService,

    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.feedbackList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load feedbacks';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  diagnoseFeedback(feedbackId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Trouver le feedback correspondant
    const feedback = this.feedbackList.find(f => f.id === feedbackId);
    if (!feedback) {
      this.errorMessage = 'Feedback not found';
      this.isLoading = false;
      return;
    }

    // Appeler le service AI
    this.http.post('http://localhost:8089/api/ai/diagnose-feedback',
      { comment: feedback.comment }
    ).subscribe({
      next: (response: any) => {
        // Mettre à jour le feedback avec le diagnostic
        feedback.diagnostic = response.diagnosis;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to analyze feedback';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  getDiagnosedCount(): number {
    return this.feedbackList.filter(f => f.diagnostic).length;
  }
}
