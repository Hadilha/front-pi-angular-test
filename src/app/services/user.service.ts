import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8089/api/users'; // L'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer l'ID de l'utilisateur depuis le localStorage
  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null; // Convertir en nombre, ou retourner null si rien n'est trouvé
  }

  // Méthode pour stocker l'ID de l'utilisateur après la connexion
  setCurrentUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  // Optionnel : Méthode pour supprimer l'ID de l'utilisateur lors de la déconnexion
  logout(): void {
    localStorage.removeItem('userId');
  }
   // Méthode pour récupérer tous les utilisateurs
   getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour récupérer un utilisateur par ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  
}
