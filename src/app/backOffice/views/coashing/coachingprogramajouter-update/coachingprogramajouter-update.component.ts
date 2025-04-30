import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CoachingProgramService } from 'src/app/Services/coaching-program/coaching-program.service';
import { CoachingProgramAjouterUpdateService } from 'src/app/Services/coachingprogramajouter-update/coachingprogramajouter-update.service';

@Component({
  selector: 'app-coachingprogramajouter-update',
  templateUrl: './coachingprogramajouter-update.component.html'
})
export class CoachingProgramAjouterUpdateComponent implements OnInit {
  errorMessage: string | null = null;

  program: any = {

    coachId: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    participants: 0,

  };
  today: string = '';
  isEdit: boolean = false;

  constructor(
    private service: CoachingProgramAjouterUpdateService,
    private router: Router,
    private route: ActivatedRoute,
    private programService: CoachingProgramService,

  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0]; // Format YYYY-MM-DD
    // Get the 'id' parameter from the route
    const programId = this.route.snapshot.paramMap.get('id');
    console.log('ID récupéré :', programId);
    if (programId) {
      this.isEdit = true;
      this.service.getById(+programId).subscribe({
        next: data => {
          console.log('Réponse API complète:', data);
          console.log('Données récupérées pour la mise à jour:', data);
           // 1. Si ton API renvoie coachId et endDate sous les mêmes noms :
    this.program = {
      programId: data.programId,
      coachId : data.coachId,
      title   : data.title,
      description: data.description,
      startDate  : this.formatDateOnly(data.startDate),
      endDate    : this.formatDateOnly(data.endDate),
      participants: data.participants
      // ajoute ici tous les autres champs de data dont tu as besoin
    };
          console.log('Vérification de this.program:', this.program);
        },
        error: () => {
          this.errorMessage = 'Erreur de chargement du programme.';
        }
      });
    }else {
      this.isEdit = false;
    this.program = {
      title: '',
      description: '',
      startDate:'', // Date actuelle au format YYYY-MM-DD
      endDate: '', // Date actuelle au format YYYY-MM-DD
      participants: 0,
      coachId: 0,

    };
    }
  }

        /**
       * Retourne la date au format 'YYYY-MM-DD'
       * à partir d’une string ou d’un Date
       */
      private formatDateOnly(date: string | Date): string {
        // Crée un objet Date quel que soit le type d’entrée
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toISOString().substring(0, 10);
      }



  onSubmit() {
    console.log('onSubmit triggered', this.program);

    this.errorMessage = null;
    console.log('CoachId soumis:', this.program.coachId);

    if (this.isEdit) {
      if (!this.program.programId) {
        this.errorMessage = "L'ID du programme est manquant.";
        return;
      }

      this.service.update(this.program).subscribe({
        next: () => {
          console.log('✅ Programme mis à jour avec succès !');
          this.router.navigate(['/backoffice/coachingprogram/programs']);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la mise à jour :', err);
        }
      });
    } else {
      this.service.create(this.program).subscribe({
        next: () => {
          console.log('✅ Nouveau programme enregistré !');
          this.router.navigate(['/backoffice/coachingprogram/programs']);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la création :', err);
        }
      });
    }
  }

  }



