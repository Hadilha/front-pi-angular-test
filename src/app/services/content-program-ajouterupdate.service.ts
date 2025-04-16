import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramContent } from '../models/content-program.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramContentService {
  private baseUrl = 'http://localhost:8089/program-contents';

  constructor(private http: HttpClient) {}

  // Get all content
  getAllContents(): Observable<ProgramContent[]> {
    return this.http.get<ProgramContent[]>(`${this.baseUrl}/programcontents`);
  }

  // Add new content
  addContent(content: ProgramContent): Observable<any> {
    return this.http.post(`${this.baseUrl}/programcontent`, content);
  }

  // Get content by ID
  getContentById(id: number): Observable<ProgramContent> {
    return this.http.get<ProgramContent>(`${this.baseUrl}/${id}`);
  }

  // Update content by ID
  updateContent(content: ProgramContent): Observable<any> {
    return this.http.put(`${this.baseUrl}/programcontent/${content.contentId}`, content);
  }
}
