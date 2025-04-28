import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { finalize } from 'rxjs/operators';
import { Note } from 'src/app/models/Note.model';
import { NoteService } from 'src/app/services/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css'],
})
export class ListNotesComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }

  private _color = 'light';
  notes: Note[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  // Load all notes from the API
  loadNotes(): void {
    this.isLoading = true;
    this.noteService
      .getAllNotes()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Notes fetched successfully', response);
          this.notes = response;
        },
        error: (error) => {
          console.error('Error while fetching notes', error);
        },
      });
  }

  // Navigate to the create page to add a new note
  navigateToCreate(): void {
    this.router.navigate(['doctor/add-note']); 
  }

  navigateToDetails(id: any): void {
    this.router.navigate([`doctor/details-note/${id}`]);
  }

  // Navigate to the update page for a specific note
  navigateToUpdate(id: number): void {
    this.router.navigate([`doctor/update-note/${id}`]);
  }

  // Delete a note by its ID
  deleteNote(noteId: any): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService
        .deleteNote(noteId)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: () => {
            this.loadNotes(); // Reload notes after deletion
            console.log('Note deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting note:', error);
          },
        });
    }
  }

  generateNotePDF(note: Note): void {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243); // #2196F3
    doc.text('Note Summary', 105, y, { align: 'center' });

    y += 10;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Author: ${note.doctor?.fullName ?? 'Dr. Unknown'}`, 30, y);
    y += 8;
    doc.text(`Diagnosis: ${note.diagnosis || '—'}`, 30, y);
    y += 8;
    doc.text(`Notes: ${note.notes || 'No notes provided'}`, 30, y);
    y += 8;

    const created = new Date(
      note.creationDate || new Date()
    ).toLocaleDateString('en-GB');
    const updated = new Date(note.updateDate || new Date()).toLocaleDateString(
      'en-GB'
    );
    const expiration = new Date(note.expirationDate).toLocaleDateString(
      'en-GB'
    );

    y += 5;
    doc.setTextColor(100);
    doc.setFontSize(11);
    doc.text(`Created: ${created}`, 30, y);
    y += 6;
    doc.text(`Last Updated: ${updated}`, 30, y);
    y += 6;
    doc.text(`Expires: ${expiration}`, 30, y);

    doc.save('note-summary.pdf');
  }

  generateNoteDescription(id: number) {
    this.noteService.summarizePatientNotesAI(id).subscribe({
      next: (response) => {
        console.log('Generated description:', response);
        Swal.fire({
          title: 'Generated description',
          text: response.message,
          icon: 'success',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Generated description',
          text: err.error,
          icon: 'warning',
        });
      },
    });
  }
}
