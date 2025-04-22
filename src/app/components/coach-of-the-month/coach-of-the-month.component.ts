import { Component, OnInit } from '@angular/core';
import { CoachStatisticsService } from 'src/app/services/coach-statistics.service'; // Importation du service

@Component({
  selector: 'app-coach-of-the-month',
  templateUrl: './coach-of-the-month.component.html',
  styleUrls: ['./coach-of-the-month.component.css']
})
export class CoachOfTheMonthComponent implements OnInit {
  coachId: number | null = null; // Exemple d'ID de coach (tu peux le remplacer dynamiquement)
  programCount: number | null = null;
  errorMessage: string = '';

  constructor(private coachStatisticsService: CoachStatisticsService) { }

  ngOnInit(): void {
    this.coachStatisticsService.getCoachOfTheMonth().subscribe({
      next: (data) => {
        this.coachId = data.coachId;
        this.programCount = data.programCount;
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la récupération des statistiques.";
        console.error(err);
      }
    });
  }
  
}
