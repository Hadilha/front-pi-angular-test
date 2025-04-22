import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramContentService {

  private baseUrl = 'http://localhost:8089/program-contents';
  private emailApi ='http://localhost:8089/send_email'; // Replace with your actual email API URL

  

  
  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    return this.http.get<any>(`${this.emailApi}`);
  }

  getProgramContents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/programcontents`);
  }

  getProgramContentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addProgramContent(data: any): Observable<{ message: string, contentId: number }> {
    return this.http.post<{ message: string, contentId: number }>(
      `${this.baseUrl}/programcontent`, data
    );
  }
  

  updateProgramContent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/programcontent/${id}`, data);
  }

  deleteProgramContent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/programcontent/${id}`);
  }
  getContentPrograms(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
