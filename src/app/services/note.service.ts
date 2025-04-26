import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/Note.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:8089/api/notes'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Get all notes
  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  // Get note by ID
  getNoteById(id: any): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  // Create a new note
  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  // Update an existing note
  updateNote(id: any, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  // Delete a note
  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPatientNotes(idPatient: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/patientNotes/${idPatient}`);
  }

  summarizePatientNotesAI(idPatient: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summarize-ai/${idPatient}`);
  }
}
