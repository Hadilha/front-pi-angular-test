import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from 'src/app/services/progress-service.service'; // Assure-toi que le chemin est correct

@Component({
  selector: 'app-coach-progress',
  templateUrl: './coach-progress.component.html',
  styleUrls: ['./coach-progress.component.css']
})
export class CoachProgressComponent implements OnInit {
  programId:number| null =null ; // ID du programme, tu peux le rendre dynamique si nécessaire
  progressData: any[] = [];

  constructor(private progressService: ProgressService ,  private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('programId');
      console.log('Paramètre programId dans l\'URL:', id); // 🔍 Trace ici
      if (id) {
        this.programId = +id;
        const userId = this.getCurrentUserId();
            if (userId && this.programId !== null) {
              this.markAsViewed(userId, this.programId);
                  }
        this.loadProgressData();}
                });
  }
  getCurrentUserId(): number | null {
    const userData = localStorage.getItem('user'); // ou 'currentUser' selon le nom
  if (userData) {
    const user = JSON.parse(userData);
    return user?.id || null;
  }
  return null;
  }
  

  loadProgressData(): void {
    if (this.programId !== null) {
      this.progressService.getProgress(this.programId).subscribe({
        next: (data) => {
          this.progressData = data;
          console.log('Progression récupérée pour le programme:', data);
          console.log('Chargement de la progression pour le programme:', this.programId);
          

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données de progression:', error);
        }
      });
    }
  }
  markAsViewed(userId: number, programId: number): void {
    this.progressService.markAsViewed(userId, programId).subscribe({
      next: (response) => {
        console.log('Programme marqué comme consulté:', response);
        // Mettre à jour l'interface utilisateur si nécessaire
      },
      error: (error) => {
        console.error('Erreur lors du marquage du programme comme consulté:', error);
      }
    });
  }
  getProgressByProgramId(programId: string): void {
    this.progressService.getProgressByProgramId(programId).subscribe({
      next: (data) => {
        console.log('Progression récupérée pour le programme:', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données de progression:', error);
      }
    });
  }
  
}
