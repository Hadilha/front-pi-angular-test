import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from 'src/app/models/Note.model';
import {  HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';



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
    const token = localStorage.getItem('token');

    // Create the request body that matches your backend DTO
    const noteData = {
      diagnosis: note.diagnosis,
      guidance: note.guidance,
      notes: note.notes,
      expirationDate: note.expirationDate,
      patient_id: note.patient_id // Ensure this matches the DTO's `patientId` field
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Add this
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Note>(`${this.apiUrl}/create`, noteData, { headers });

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
