import { Component, OnInit } from '@angular/core';
import { CoachingProgramService } from '../../services/coaching-program.service';
import { CoachingProgram } from '../../models/coaching-program.model';
import { Router } from '@angular/router'; // Assure-toi que cette ligne est présente
@Component({
  selector: 'app-coachingprogram',
  templateUrl: './coachingprogram.component.html',
  styleUrls: ['./coachingprogram.component.css']
})
export class CoachingprogramComponent implements OnInit {
  programs: CoachingProgram[] = [];
  isLoading = true;

  constructor(private coachingProgramService: CoachingProgramService, private router: Router) {}
  
  
  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.coachingProgramService.getPrograms().subscribe({
      next: (programs) => {
        console.log("📦 Données reçues :", programs); // Affiche les programmes reçus
        this.programs = programs;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des programmes', err);
        this.isLoading = false;
      }
    });
  }
  editProgram(id: number): void {
    console.log('Modifier le programme avec ID :', id);
    this.router.navigate(['coaching-program' + id]);  
  }
  onDelete(id: number) : void {
    if (!id) {
      console.error("ID du programme manquant !");
      return;
    }
    console.log('Supprimer le programme avec ID :', id);
    // Appel de la méthode de suppression du service
    // Remplacez 'id' par l'identifiant réel du programme à supprimer
    if (confirm("Voulez-vous vraiment supprimer ce programme ?")) {
      this.coachingProgramService.delete({ programId: id }).subscribe({
        next: () => {
          console.log("✅ Programme supprimé !");
          //this.router.navigate(['/backoffice/coachingprogram/programs']);
          this.loadPrograms();
        },
        error: (err) => {
          console.error("❌ Erreur lors de la suppression :", err);
        }
      });
    }
  }

  deleteProgram(id: number): void {
    console.log('Supprimer le programme avec ID :', id);
  }
  
  createProgram(): void {
    this.router.navigate(['/coaching-program']);  }
}
