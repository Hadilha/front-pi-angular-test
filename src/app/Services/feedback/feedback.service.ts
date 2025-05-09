import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // Adjust this if necessary



  private readonly apiUrl = `${environment.url}/feedback`;
  private readonly aiApiUrl = `${environment.aiUrl}`;

  constructor(private http: HttpClient) { }



  addFeedback(feedback: any, patientId: number, contentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${patientId}/${contentId}`, feedback);
  }

//Diagnostiquer un feedback
diagnoseFeedback(feedbackId: number): Observable<any> {
  return this.http.post(`${this.aiApiUrl}/diagnose-feedback`, {Comment  });
}

// Obtenir la liste des notifications
getNotifications(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/notifications`);
}

// Obtenir tous les feedbacks
getAllFeedbacks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/all`);
}

// Obtenir la moyenne des notes pour un programme
getAverageRating(programId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/average/${programId}`);
}








  // Méthode pour envoyer une requête d'AI et obtenir une réponse
  getResponse(prompt: string): Observable<string> {
    return this.http.post(this.aiApiUrl, { model: "mistral", prompt }, { observe: 'body', responseType: 'arraybuffer' })
      .pipe(
        map(response => {
          const decoder = new TextDecoder('utf-8');
          const textResponse = decoder.decode(response); // Decode ArrayBuffer to string

          // Split by newlines and filter empty lines
          const lines = textResponse.split('\n').filter(line => line.trim());

          // Map through lines and extract responses
          const responses = lines.map(line => {
            try {
              const json = JSON.parse(line);
              return json.response || ''; // If "response" exists, return it, else empty string
            } catch (e) {
              console.error('Failed to parse line:', line);
              return '';
            }
          });

          return responses.join(' ');  // Join the parsed responses
        }),
        catchError((error) => {
          console.error('Erreur lors de l\'obtention de la réponse AI', error);
          return throwError(() => new Error('Erreur lors de l\'obtention de la réponse AI'));
        })
      );
  }
}
