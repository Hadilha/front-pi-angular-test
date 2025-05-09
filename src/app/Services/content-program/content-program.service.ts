import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ProgramContent } from 'src/app/models/content-program.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramContentService {

  // Replace with your actual email API URL

  private readonly baseUrl = `${environment.url}/program-content`;
  private readonly emailApi = `${environment.url}/send_email`;



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
  getUsersByContent(contentId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${contentId}/users`);
  }


  updateProgramContent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/programcontent/${id}`, data);
  }

  deleteProgramContent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/programcontent/${id}`);
  }
  getContentPrograms(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }
  searchContents(keyword: string): Observable<ProgramContent[]> {
    return this.http.get<ProgramContent[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }


}
