import { Component, OnInit } from '@angular/core';
import { PatientNote } from '../../models/patient-note.model';
import { PatientNoteService } from '../../services/patient-note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: PatientNote[] = [];

  constructor(private noteService: PatientNoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getAllNotes().subscribe(
      data => this.notes = data,
      error => console.error('Error fetching notes', error)
    );
  }

  deleteNote(id: number): void {
    if(confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(id).subscribe(
        () => this.notes = this.notes.filter(n => n.noteId !== id),
        error => console.error('Error deleting note', error)
      );
    }
  }
}
