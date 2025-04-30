import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { finalize } from 'rxjs';
import { Note } from 'src/app/models/Note.model';
import { NoteService } from 'src/app/Services/note/note.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-patient-notes',
  templateUrl: './patient-notes.component.html',
  styleUrls: ['./patient-notes.component.css']
})
export class PatientNotesComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value !== 'light' && value !== 'dark' ? 'light' : value;
  }

  private _color = 'light';
  notes: Note[] = [];
  isLoading: boolean = false;
  idpatient!: number;

  constructor(
    private router: Router,
    private noteService: NoteService,
    private users: UserService
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.isLoading = true;
    const userId = this.users.getCurrentUserId();
    if (userId !== null) {
      this.idpatient = userId;
    } else {
      console.error('Error: Current user ID is null');
    }
    console.log("idpatient+++++",this.idpatient);
    this.noteService
      .getPatientNotes(this.idpatient)
      .pipe(finalize(() => this.isLoading = false))
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

  navigateToDetails(id: number): void {
    this.router.navigate([`/details-note/${id}`]);
  }

  generateNotePDF(note: Note): void {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243);
    doc.text('Note Summary', 105, y, { align: 'center' });

    y += 10;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Author: ${note.doctor?.username ?? 'Dr. Unknown'}`, 30, y);
    y += 8;
    doc.text(`Diagnosis: ${note.diagnosis || '—'}`, 30, y);
    y += 8;
    doc.text(`Notes: ${note.notes || 'No notes provided'}`, 30, y);
    y += 8;

    const created = new Date(note.creationDate || new Date()).toLocaleDateString('en-GB');
    const updated = new Date(note.updateDate || new Date()).toLocaleDateString('en-GB');
    const expiration = note.expirationDate
      ? new Date(note.expirationDate).toLocaleDateString('en-GB')
      : 'N/A';

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
}
