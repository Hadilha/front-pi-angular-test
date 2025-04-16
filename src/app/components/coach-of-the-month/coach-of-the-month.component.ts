import { Component, OnInit } from '@angular/core';
import { CoachStatisticsService } from 'src/app/services/coach-statistics.service';

@Component({
  selector: 'app-coach-of-the-month',
  templateUrl: './coach-of-the-month.component.html',
  styleUrls: ['./coach-of-the-month.component.css']
})
export class CoachOfTheMonthComponent implements OnInit {

  coachOfTheMonth: any;

  constructor(private coachStatisticsService: CoachStatisticsService) {}

  ngOnInit(): void {
    this.coachStatisticsService.getCoachWithMostPrograms().subscribe({
      next: (data) => {
        this.coachOfTheMonth = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du coach du mois', err);
      }
    });
  }
  
}
