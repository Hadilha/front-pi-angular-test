import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Role, User } from 'src/app/models/user.model';
import { NoteService } from 'src/app/Services/note/note.service';
import { UserService } from 'src/app/Services/user/user.service';
import { Note } from 'src/app/models/Note.model';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css'],
})
export class UpdateNoteComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';
  noteForm: FormGroup;
  isLoading: boolean = false;
  patientList: User[] = [];
  noteId: number = 0;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      diagnosis: ['', Validators.required],
      guidance: [''],
      notes: [''],
      expirationDate: ['', Validators.required],
      patient: ['', Validators.required],
    });
  }

 ngOnInit(): void {
    this.userService.getUsersByRole(Role.PATIENT).subscribe({
      next: (response) => {
        this.patientList = response;
        console.log('Patients fetched successfully', this.patientList);
        this.noteId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.noteId) {
          this.loadNote();
        }
      },
      error: (error) => {
        console.error('Error fetching patients', error);
      },
    });
  }

  loadNote(): void {
    this.noteService.getNoteById(this.noteId).subscribe({
      next: (note) => {
        const matchedPatient = this.patientList.find(
          (p) => p.id === note.patient_id
        );
        this.noteForm.patchValue({
          diagnosis: note.diagnosis,
          guidance: note.guidance,
          notes: note.notes,
          expirationDate: note.expirationDate,
          patient: matchedPatient || null,
        });
        console.log('Note loaded successfully', note);
      },
      error: (error) => {
        console.error('Error loading note', error);
      },
    });
  }

  onSubmit(): void {
    if (this.noteForm.invalid) return;

    this.isLoading = true;
    const formValue = this.noteForm.value;

    this.userService.getCurrentUser().subscribe({
      next: (doctor: User) => {
        const updatedNote: Note = {
          diagnosis: formValue.diagnosis,
          guidance: formValue.guidance,
          notes: formValue.notes,
          expirationDate: formValue.expirationDate,
          patient_id: formValue.patient.id,
          doctor_id: doctor.id,
        };

        this.noteService
          .updateNote(this.noteId, updatedNote)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: () => this.router.navigate(['/doctor/notes']),
            error: (error) => console.error('Error updating note', error),
          });
      },
      error: (error) => {
        console.error('Error fetching current user', error);
        this.isLoading = false;
      },
    });
  }


}
