import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoachingProgram } from 'src/app/models/coaching-program.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachingProgramService {
  private readonly apiUrl = `${environment.url}/coaching-programs`;


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
  // Méthode pour récupérer les programmes avec pagination
  getCoachingPrograms(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  searchPrograms(keyword: string): Observable<CoachingProgram[]> {
    return this.http.get<CoachingProgram[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  getProgramDetails(programId: number): Observable<CoachingProgram> {
    return this.http.get<CoachingProgram>(`/api/coaching-programs/${programId}`);
  }


}
