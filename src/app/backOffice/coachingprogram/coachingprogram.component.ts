import { Component, OnInit } from '@angular/core';
import { CoachingProgramService } from '../../services/coaching-program.service';
import { CoachingProgram } from '../../models/coaching-program.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-coachingprogram',
  templateUrl: './coachingprogram.component.html',
  styleUrls: ['./coachingprogram.component.css']
})
export class CoachingprogramComponent implements OnInit {
  programs: CoachingProgram[] = [];
  isLoading = true;
  currentPage = 0;
  pageSize = 2; // Nombre d'éléments par page
  lastPage = 0;
  totalPages: number = 0;
  keyword: string = '';

  constructor(private coachingProgramService: CoachingProgramService, private router: Router) {}
  
  
  ngOnInit(): void {
    this.loadPrograms();
    this.filteredPrograms ; // initialiser la liste filtrée
   
  }

  loadPrograms() {
    this.isLoading = true;
    this.coachingProgramService.getCoachingPrograms(this.currentPage, this.pageSize).subscribe(
      data => {
        this.programs = data.content;  // Données des programmes
        this.totalPages = data.totalPages;  // Nombre total de pages
        this.isLoading = false;
      },
      error => {
        console.error("Erreur lors du chargement des programmes", error);
        this.isLoading = false;
      }
    );
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPrograms(); // recharge les données
    }
  }
  
  goToPrevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPrograms(); // recharge les données
    }
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


    get filteredPrograms(): CoachingProgram[] {
      if (!this.keyword || !this.keyword.trim()) {
        return this.programs;
      }
    
      const lowerKeyword = this.keyword.toLowerCase();
    
      return this.programs.filter(program =>
        (program.title && program.title.toLowerCase().includes(lowerKeyword)) ||
        (program.description && program.description.toLowerCase().includes(lowerKeyword))
      );
    }

    goToFeedbackPage(): void {
      this.router.navigate(['/feedback']);
      }
      
      
    
    
    onSearch(keyword: string) {
      this.keyword = keyword.trim();
      if (!this.keyword) {
        this.loadPrograms(); // Si la recherche est vide, recharger tout
      } else {
        this.coachingProgramService.searchPrograms(this.keyword).subscribe({
          next: (result) => {
            this.programs = result;
          },
          error: (err) => {
            console.error("Erreur lors de la recherche :", err);
          }
        });
      }
    }
    
  }

