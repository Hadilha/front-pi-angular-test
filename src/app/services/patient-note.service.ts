import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientNote } from '../models/patient-note.model';

@Injectable({
  providedIn: 'root'
})
export class PatientNoteService {
  private apiUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<PatientNote[]> {
    return this.http.get<PatientNote[]>(this.apiUrl);
  }

  getNoteById(id: number): Observable<PatientNote> {
    return this.http.get<PatientNote>(`${this.apiUrl}/${id}`);
  }

  createNote(note: PatientNote): Observable<PatientNote> {
    return this.http.post<PatientNote>(this.apiUrl, note);
  }

  updateNote(id: number, note: PatientNote): Observable<PatientNote> {
    return this.http.put<PatientNote>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
