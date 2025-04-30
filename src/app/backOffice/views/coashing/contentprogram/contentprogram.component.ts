import { Component , OnInit} from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { ProgramContent } from 'src/app/models/content-program.model';
import { ProgramContentService } from 'src/app/Services/content-program/content-program.service';
@Component({
  selector: 'app-contentprogram',
  templateUrl: './contentprogram.component.html',
  styleUrls: ['./contentprogram.component.css']
})
export class ContentprogramComponent implements OnInit {

  programContents: ProgramContent[] = [];
  isLoading: boolean = true;
  currentUserId!: number;
  currentPage = 0;
  pageSize = 2; // Nombre d'éléments par page
  lastPage = 0;
  totalPages: number = 0;

  constructor(private programContentService: ProgramContentService,
              private userService: UserService,


  ) {}

  ngOnInit(): void {
    this.currentUserId = this.userService .getCurrentUserId()!;
    // Vérifier si l'ID est valide

      this.loadProgramContents();


  }

  get userId(): number {
    return this.currentUserId;
  }


  // Charger les contenus de programme depuis le service
  loadProgramContents(): void {
    this.programContentService.getContentPrograms(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.programContents = data.content;      // ✅ Accès à la liste
      this.totalPages = data.totalPages;   // mettre à jour les pages
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading program content data', error);
        this.isLoading = false;
      }
    });
  }
  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProgramContents();
    }
  }

  goToPrevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProgramContents();
    }
  }

 // Ajoutez ces méthodes pour résoudre les erreurs
 createProgramContent(): void {
  // Implémentez la logique pour ajouter du contenu
  console.log('Ajouter du contenu');
  // Exemple : this.router.navigate(['/add-content']);
}

updateProgramContent(contentId: number): void {
  // Implémentez la logique pour éditer
  console.log('Éditer le contenu ID:', contentId);
  // Exemple : this.router.navigate(['/edit-content', contentId]);
}

deleteProgramContent(contentId: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
    this.programContentService.deleteProgramContent(contentId).subscribe({
      next: () => {
        console.log('✅ Suppression réussie');
        this.loadProgramContents(); // ⬅️ Recharge la liste depuis le backend
      },
      error: (err) => console.error('❌ Erreur de suppression:', err)
    });
  }
}
getUsersForContent(contentId: number): void {
  this.programContentService.getUsersByContent(contentId).subscribe({
    next: (data) => {
      console.log(`Utilisateurs pour le contenu ${contentId} :`, data);
    },
    error: (err) => console.error('Erreur lors de la récupération des utilisateurs', err)
  });
}
/*getProgramProgress(programId: number): void {
  // Vérifier que userId et programId sont valides avant d'envoyer la requête
  if (this.currentUserId && programId) {
    this.programProgressService.getUserProgramProgress(this.currentUserId, programId).subscribe({
      next: (progress) => {
        console.log(`Progression du programme ${programId} pour l'utilisateur ${this.currentUserId} : ${progress}%`);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la progression', err);
      }
    });
  } else {
    console.error('ID utilisateur ou ID du programme invalide');
  }
}*/


}
