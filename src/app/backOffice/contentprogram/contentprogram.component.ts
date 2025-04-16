import { Component , OnInit} from '@angular/core';
import { ProgramContentService } from '../../services/content-program.service';
import { ProgramContent } from '../../models/content-program.model';

@Component({
  selector: 'app-contentprogram',
  templateUrl: './contentprogram.component.html',
  styleUrls: ['./contentprogram.component.css']
})
export class ContentprogramComponent implements OnInit {

  programContents: ProgramContent[] = [];
  isLoading: boolean = true;

  constructor(private programContentService: ProgramContentService) {}

  ngOnInit(): void {
    this.loadProgramContents();
  }

  // Charger les contenus de programme depuis le service
  loadProgramContents(): void {
    this.programContentService.getProgramContents().subscribe({
      next: (data) => {
        this.programContents = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading program content data', error);
        this.isLoading = false;
      }
    });
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

}
