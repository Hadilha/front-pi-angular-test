import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProgramContentService } from 'src/app/services/content-program.service';
import { ProgramContent } from 'src/app/models/content-program.model';

@Component({
  selector: 'app-content-program-ajouterupdate',
  templateUrl: './content-program-ajouterupdate.component.html',
  styleUrls: ['./content-program-ajouterupdate.component.css']
})
export class ContentProgramAjouterupdateComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  contentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private programContentService: ProgramContentService // ✅ service injecté ici
  ) {}

  ngOnInit(): void {
    this.initForm(); // ✅ appel obligatoire pour initialiser le formulaire
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.contentId = +idParam;
        console.error("❌ ID invalide pour chargement");
        this.programContentService.getProgramContentById(this.contentId).subscribe({
          next: (data: ProgramContent) => {
            this.form.patchValue({
              title: data.title,
              contentType: data.contentType,
              contentDesc: data.contentDesc,
              mediaLink: data.mediaLink,
              coachingProgram: {
                programId:Number
              }
            });
          },
          error: err => {
            console.error('Erreur de chargement du contenu :', err);
          }
        });
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [''],
      contentType: [''],
      contentDesc: [''],
      mediaLink: [''],
      coachingProgram: this.fb.group({
        programId: [null]
      })
    });
  }

  sendEmail(): void {
    this.programContentService.sendEmail({}).subscribe({
      next: (response) => {
        console.log('Message reçu :', response.message);
        console.log('Email Sent');}});
  }
    

  onSubmit(): void {
    console.log('Valeurs du formulaire :', this.form.value); // ✅ ici

    if (this.isEdit) {
      // Mise à jour du contenu
      this.programContentService.updateProgramContent(this.contentId, this.form.value)
        .subscribe({
          next: () => {
            console.log('Redirection vers la liste des contenus');
            console.error("❌ ID manquant pour édition");
            this.router.navigateByUrl('/backoffice/content-program');
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour :', err);
          }
        });
    } else {
      // Ajout d'un nouveau contenu
      this.programContentService.addProgramContent(this.form.value)
        .subscribe({
          next: (response) => {
            console.log('Message reçu :', response.message);
            console.log('ID du contenu :', response.contentId);
            alert(response.message); // Facultatif : affiche le message à l'utilisateur
            this.sendEmail();
            this.router.navigateByUrl('/backoffice/content-program');
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout :', err);
          }
        });
    }
  }
  
  
}
