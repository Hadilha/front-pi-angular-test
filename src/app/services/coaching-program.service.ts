import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoachingProgram } from '../models/coaching-program.model';

@Injectable({
  providedIn: 'root'
})
export class CoachingProgramService {
  private apiUrl = 'http://localhost:8089/coaching-programs'; 

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<CoachingProgram[]> {
    return this.http.get<CoachingProgram[]>(`${this.apiUrl}/coachingPrograms`);
  }

  getProgram(id: number): Observable<CoachingProgram> {
    return this.http.get<CoachingProgram>(`${this.apiUrl}/coachingProgram/${id}`);
  }

  createProgram(program: CoachingProgram): Observable<CoachingProgram> {
    return this.http.post<CoachingProgram>(`${this.apiUrl}/coachingProgram`, program);
  }

  updateProgram(id: number, program: CoachingProgram): Observable<CoachingProgram> {
    return this.http.put<CoachingProgram>(`${this.apiUrl}/coachingProgram/${id}`, program);
  }

  delete(program:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/coachingProgram/${program.programId}`); // DELETE /coaching-programs/{id}
  }
}
