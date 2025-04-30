import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Role, User } from 'src/app/models/user.model';
import { NoteService } from 'src/app/Services/note/note.service';
import { UserService } from 'src/app/Services/user/user.service';
import { Note } from 'src/app/models/Note.model';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
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
  doctorList: User[] = [];
  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private userService: UserService
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
      },
      error: (error) => {
        console.error('Error fetching patients', error);
      },
    });
  }

  onSubmit(): void {
    if (this.noteForm.invalid) return;

    this.isLoading = true;

    const formValue = this.noteForm.value;

    this.userService.getCurrentUser().subscribe({
      next: (doctor: User) => {
        console.log("doctor",doctor);
        console.log("--doctor.id--",doctor.id);
        const noteData: Note = {
          diagnosis: formValue.diagnosis,
          guidance: formValue.guidance,
          notes: formValue.notes,
          expirationDate: formValue.expirationDate,
          patient_id: formValue.patient.id, // Send only the patient's ID
          doctor_id: doctor.id // Optional: Include doctor ID if needed
        };
console.log("noteData",noteData);
        this.noteService
          .createNote(noteData)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: () => this.router.navigate(['/doctor/notes']),
            error: (error) => console.error('Error adding note', error),
          });
      },
      error: (error) => {
        console.error('Error fetching current user', error);
        this.isLoading = false;
      },
    });
  }
}
