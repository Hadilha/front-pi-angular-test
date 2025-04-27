import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = 'http://localhost:8089/api/patient';

  constructor(private http: HttpClient) { }

  // Token and user related methods
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Token decode error:', e);
      return null;
    }
  }

  private getUserRoleFromToken(token: string): string | null {
    const decoded = this.decodeToken(token);
    const rawRole = decoded?.roles?.[0];
    return rawRole;
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) return null;

    const decoded = this.decodeToken(token);
    console.log('Decoded Token:', decoded);
    return decoded?.userId || decoded?.id;
  }

  // Journal CRUD operations
  getJournalsByUserId(): Observable<Journal[]> {
    const userId = this.getCurrentUserId();
    console.log('User ID:', userId);

    const token = localStorage.getItem('token');
    const role = this.getUserRoleFromToken(token!);
    console.log('Role:', role);

    if (!userId) {
      return throwError(() => new Error('User ID not found in local storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}/journal/user/${userId}`;

    return this.http.get<Journal[]>(url, { headers }).pipe(
      map((response: Journal[]) => response.map((journal: Journal) => ({
        id: journal.id,
        title: journal.title,
        content: journal.content,
        entryDate: new Date(journal.entryDate),
        mood: journal.mood,
      }))),
      catchError((error) => {
        console.error('Error fetching journals:', error);
        return throwError(() => new Error('Failed to load journals'));
      })
    );
  }

  createJournalEntry(journalData: Journal): Observable<Journal> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Authentication token not found'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const userId = this.getCurrentUserId();
    console.log('User ID:', userId);
    const url = `${this.apiUrl}/journal/create/${userId}`;
    console.log("data journal", journalData);

    return this.http.post<Journal>(url, journalData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Failed to create journal entry';

        if (error.status === 403) {
          errorMessage = 'Permission denied: Patient role required';
        } else if (error.status === 401) {
          errorMessage = 'Authentication required';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  updateJournal(journal: Journal): Observable<Journal> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Authentication token not found'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}/journal/update/${journal.id}`;
    return this.http.put<Journal>(url, journal, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Failed to update journal entry';

        if (error.status === 403) {
          errorMessage = 'Permission denied: Patient role required';
        } else if (error.status === 401) {
          errorMessage = 'Authentication required';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  deleteEntry(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Authentication token not found'));
    }

    const url = `${this.apiUrl}/journal/delete/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Failed to delete journal entry';

        if (error.status === 403) {
          errorMessage = 'Permission denied: Patient role required';
        } else if (error.status === 401) {
          errorMessage = 'Authentication required';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

 /* correctGrammar(sentence: string) {
    return this.http.post<any>('http://localhost:8089/api/shared_All/grammar/correct', {
      sentence: sentence
    });
  }*/
    correctGrammarStream(sentence: string): Observable<string> {
      return new Observable<string>(observer => {
        fetch(`http://localhost:8089/api/shared_All/grammar/correct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sentence })
        })
        .then(resp => {
          if (!resp.body) {
            throw new Error('No response body');
          }
          const reader = resp.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

          function readChunk(): void {
            reader.read().then(({ done, value }) => {
              if (done) {
                observer.complete();
                return;
              }
              // split on newlines, parse each JSON object
              const lines = value.split('\n');
              for (const line of lines) {
                if (!line.trim()) continue;
                try {
                  const obj = JSON.parse(line);
                  observer.next(obj.response);
                } catch (e) {
                  // ignore partial JSON
                }
              }
              readChunk();
            }).catch(err => observer.error(err));
          }
          readChunk();
        })
        .catch(err => observer.error(err));

        // no teardown logic needed
      });
    }





}
