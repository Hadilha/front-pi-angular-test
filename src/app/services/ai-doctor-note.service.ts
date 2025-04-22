// src/app/services/ai-doctor-note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiDoctorNoteService {
  private readonly apiUrl = `${environment.apiUrl}/notes/generate`; 

  constructor(private http: HttpClient) {}

  generateDoctorNote(summary: string): Observable<string> {
    return this.http.post(this.apiUrl, summary, { responseType: 'text' });
  }
}
