import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProgramContent } from 'src/app/models/content-program.model';

import { ProgramContentService } from 'src/app/Services/content-program/content-program.service';

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
    private programContentService: ProgramContentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.contentId = +idParam;
        console.log('ID récupéré :', this.contentId);

        this.programContentService.getProgramContentById(this.contentId).subscribe({
          next: (data: ProgramContent) => {
            this.form.patchValue({
              title: data.title,
              contentType: data.contentType,
              contentDesc: data.contentDesc,
              mediaLink: data.mediaLink,

                programId: data.programId // Assure-toi que coachingProgram est défini


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
      title: ['', [Validators.required, Validators.minLength(3)]],
      contentType: ['', Validators.required],
      contentDesc: ['', [Validators.required, Validators.minLength(10)]],
      mediaLink: ['', [Validators.required, Validators.pattern('https?://.+')]],
      coachingProgram: this.fb.group({
        programId: [null, [Validators.required, Validators.min(1)]]
      })
    });
  }

  sendEmail(): void {
    this.programContentService.sendEmail(this.form.value).subscribe({
      next: (response) => {
        console.log('Message reçu :', response.message);
        console.log('Email Sent');
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de l\'email :', err);
      }
    });
  }

  onSubmit(): void {
    console.log('Valeurs du formulaire :', this.form.value);
    const content: ProgramContent = this.form.value;
  console.log('Program ID à mettre à jour :', content.programId);

    if (this.isEdit) {
      this.programContentService.updateProgramContent(this.contentId, this.form.value)
        .subscribe({
          next: () => {
            console.log('Redirection vers la liste des contenus');
            this.router.navigateByUrl('/backoffice/content-program');
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour :', err);
          }
        });
    } else {
      this.programContentService.addProgramContent(this.form.value)
        .subscribe({
          next: (response) => {
            console.log('Message reçu :', response.message);
            alert(response.message);
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
