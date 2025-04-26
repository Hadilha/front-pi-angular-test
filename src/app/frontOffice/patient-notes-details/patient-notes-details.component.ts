import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Note } from 'src/app/models/Note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-patient-notes-details',
  templateUrl: './patient-notes-details.component.html',
  styleUrls: ['./patient-notes-details.component.css']
})
export class PatientNotesDetailsComponent {
 noteId: string | null = null;
  note: Note | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      this.fetchNote(this.noteId);
    }
  }

  fetchNote(id: string): void {
    this.isLoading = true;
    this.noteService
      .getNoteById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (note) => {
          this.note = note;
        },
        error: (error) => {
          console.error('Error fetching note:', error);
        },
      });
  }
}
