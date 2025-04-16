import { Component, OnInit } from '@angular/core';
import { CoachingProgram } from '../../models/coaching-program.model';
import { CoachingProgramService } from 'src/app/services/coaching-program.service';

import { CoachingProgramAjouterUpdateService } from '../../services/coachingprogramajouter-update.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    startDate: new Date(),
    endDate: new Date(),
    participants: 0,
    version: 0
  };
  
  constructor(
    private service: CoachingProgramAjouterUpdateService,
    private router: Router,
    private route: ActivatedRoute,
    private programService: CoachingProgramService,
    
  ) {}
  isEdit: boolean = false;
  ngOnInit(): void {
    const programId = this.route.snapshot.paramMap.get('id');
    console.log('ID récupéré :', programId);
    if (programId) {
      this.isEdit = true;
      this.service.getById(+programId).subscribe({
        next: data => {
          this.program = { ...data }; // data doit contenir un champ `id`
          console.log('Programme chargé :', this.program);
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
      startDate: '',
      endDate: '',
      participants: 0,
      coachId: 0,
      version: 0
    };
    }
  }
 
  private formatDateOnly(dateString: string): string {
    return new Date(dateString).toISOString().substring(0, 10);
  }
  
  
  
  onSubmit() {
    console.log('onSubmit triggered', this.program);
  
    this.errorMessage = null;
  
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
  
  

