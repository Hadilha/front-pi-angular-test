import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbacks: Feedback[] = [];
  notifications: string[] = [];
  rating: number = 0; 
  comment: string = '';

  // Ajout patientId et contentId
  patientId!: number;
  contentId!: number;

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 🔥 Récupérer les paramètres de l'URL
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'));
    this.contentId = Number(this.route.snapshot.paramMap.get('contentId'));

    // Vérification que contentId est valide (si 0 ou invalide, ne pas continuer)
    if (this.contentId === 0 || isNaN(this.contentId)) {
      alert("L'ID du contenu est invalide.");
      return;  // Arrêter l'exécution
    }

    this.getAllFeedbacks();
    this.getNotifications();
  }

  getAllFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  getNotifications() {
    this.feedbackService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }

  submitFeedback() {
    const feedback = {
      rating: this.rating,
      comment: this.comment
    };

    this.feedbackService.addFeedback(feedback, this.patientId, this.contentId).subscribe({
      next: (res) => {
        alert('Feedback envoyé avec succès et notification envoyée au coach !');
        this.getAllFeedbacks(); // rafraîchir la liste
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'envoi du feedback');
      }
    });
  }

  diagnose(feedbackId: number) {
    this.feedbackService.diagnoseFeedback(feedbackId).subscribe({
      next: (response) => {
        console.log('Diagnostic reçu:', response);
        this.getAllFeedbacks(); // rafraîchir après diagnostic
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du diagnostic');
      }
    });
  }
}
