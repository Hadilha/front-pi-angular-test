import { UserService } from 'src/app/Services/user/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Note } from 'src/app/models/Note.model';
import { NoteService } from 'src/app/Services/note/note.service';
import {User} from "src/app/models/user.model"

@Component({
  selector: 'app-details-note',
  templateUrl: './details-note.component.html',
  styleUrls: ['./details-note.component.css'],
})
export class DetailsNoteComponent implements OnInit {

  private _color = 'light';
  noteId: string | null = null;
  note: Note | null = null;
  isLoading: boolean = false;
  doctorUser: User | null = null;


  @Input()
    get color(): string {
      return this._color;
    }

    set color(color: string) {
      this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
    }



  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private UserService: UserService
  ) {
  }

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
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (note) => {
          this.note = note;
          console.log("note",note);

          if (note.doctor_id) {
            this.UserService.getUserById(note.doctor_id).subscribe({
              next: (doctor) => (this.doctorUser = doctor),
              error: (error) => console.error('Error fetching doctor:', error),
            });
          }
        },
      
        error: (error) => console.error('Error fetching note:', error),
      });
  }
}
