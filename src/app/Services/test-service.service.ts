import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private apiUrl = 'http://localhost:8089/api/tests';

  constructor(private http: HttpClient) { }

  saveTest(test: Test): Observable<Test> {
          return this.http.post<Test>(this.apiUrl, test);
  }

  getAllTests(): Observable<Test[]> {
          return this.http.get<Test[]>(this.apiUrl);
  }

  deleteTest(id: number): Observable<Test> {
      return this.http.delete<Test>(`${this.apiUrl}/${id}`);
  }

  getTestById(id: number): Observable<Test> {
      return this.http.get<Test>(`${this.apiUrl}/${id}`);
    }

  updateTest(id: number, test: Test): Observable<Test> {
      return this.http.put<Test>(`${this.apiUrl}/${id}`, test);
  }
}
