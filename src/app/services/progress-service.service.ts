import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private baseUrl = 'http://localhost:8089/api/progress';  // URL de ton API backend

  constructor(private http: HttpClient) {}

  /**
   * Marquer un programme comme consulté par un utilisateur
   * @param userId : ID de l'utilisateur (patient)
   * @param programId : ID du programme
   */
  markAsViewed(userId: number, programId: number): Observable<any> {
    // Créer les paramètres de requête
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('programId', programId.toString());

    // Faire la requête POST pour marquer comme consulté
    return this.http.post(`${this.baseUrl}/mark-as-viewed`, {}, { params }).pipe(
      catchError(error => {
        console.error('Erreur lors du marquage du contenu comme vu', error);
        return of({ error: 'Une erreur est survenue' });  // Retourner un objet d'erreur par exemple
      })
    );  }

  /**
   * Récupérer la progression d'un programme pour un utilisateur
   * @param programId : ID du programme
   */
  getProgressByProgramId(programId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${programId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de la progression', error);
        return of([]);  // Retourner un tableau vide si une erreur survient
      })
    );
  }
  /**
   * Récupérer toutes les progressions des utilisateurs
   */
  getProgress(programId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${programId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de toutes les progressions', error);
        return of([]);  // Retourner un tableau vide si une erreur survient
      })
    );
  }
  
}
