import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientNote } from '../../models/patient-note.model';
import { PatientNoteService } from '../../services/patient-note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  isEditMode = false;
  noteId?: number;

  constructor(
    private fb: FormBuilder,
    private noteService: PatientNoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      description: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      prescriptionId: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.noteId = +params['id'];
        this.loadNote(this.noteId);
      }
    });
  }

  loadNote(id: number): void {
    this.noteService.getNoteById(id).subscribe(
      note => {
        this.noteForm.patchValue({
          description: note.description,
          patientId: note.patient?.userId,
          doctorId: note.doctor?.userId,
          prescriptionId: note.prescription?.prescriptionId
        });
      },
      error => console.error('Error loading note', error)
    );
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;

      if (this.isEditMode && this.noteId) {
        this.noteService.updateNote(this.noteId, noteData).subscribe(
          () => this.router.navigate(['/notes']),
          error => console.error('Error updating note', error)
        );
      } else {
        this.noteService.createNote(noteData).subscribe(
          () => this.router.navigate(['/notes']),
          error => console.error('Error creating note', error)
        );
      }
    }
  }
}
