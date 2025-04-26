import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8089/api';
  private dataChanged = new BehaviorSubject<void>(undefined);
  private currentSessions = new Map<string, string>();

  constructor(private http: HttpClient, private router: Router) {
    this.setupStorageListener();
  }
  private setupStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        const previousUser = this.getCurrentUsername();
        const newToken = localStorage.getItem('token');
        const newUser = newToken ? this.getCurrentUsername() : null;

        if (newUser !== previousUser) {
          this.logout();
          this.router.navigate(['/auth/login'], {
            queryParams: { sessionConflict: true }
          });
        }
      }
    });
  }
  // Data change notification
  notifyDataChanged() {
    this.dataChanged.next();
  }

  get dataChanged$(): Observable<void> {
    return this.dataChanged.asObservable();
  }
  private invalidateExistingSessions(username: string) {
    this.currentSessions.delete(username);
  }
  getCurrentSession(username: string): string | undefined {
    return this.currentSessions.get(username);
  }
  isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      const username = decoded.sub;
      if (!username) {
        return false;
      }

      return this.currentSessions.get(username) === token;
    } catch (e) {
      return false;
    }}


  login(username: string, password: string): Observable<string> {
    localStorage.removeItem('token');

    return this.http.post(
      `${this.apiUrl}/auth/login`,
      { username, password },
      { responseType: 'text' }
    ).pipe(
      tap((token: string) => {
        this.invalidateExistingSessions(username);
        this.currentSessions.set(username, token);

        localStorage.setItem('token', token);
        const role = this.getUserRoleFromToken(token);
        console.log('Resolved Role:', role);

        switch(role) {
          case 'PATIENT':
            this.router.navigate(['/patientspace']);
            break;
          case 'DOCTOR':
            this.router.navigate(['/doctor/patientList']);
            break;
          case 'ADMIN':
            this.router.navigate(['/admin/usermanagment']);
            break;
          default:
            console.error('Unauthorized role:', role);
            this.router.navigate(['/']);
        }
      }),
      catchError(error => throwError(() => new Error(`Login failed: ${error.message}`)))
    );
  }

logout(): void {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<{ sub: string }>(token);
      if (decoded.sub) {
        this.currentSessions.delete(decoded.sub);
      }
    } catch (e) {
      console.error('Token decode error on logout:', e);
    }
  }
  localStorage.removeItem('token');
  this.router.navigate(['/auth/login']);
}

  registerUser(userData: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/auth/register`,
      userData
    ).pipe(
      catchError(error => throwError(() => new Error(error.error || 'Registration failed')))
    );
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email }, {
      responseType: 'text'
    });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, {
      token,
      newPassword
    });
  }

  // Token and user info methods
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
    return rawRole ? rawRole.replace('ROLE_', '') : null;
  }

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('token');
    return token ? this.getUserRoleFromToken(token) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = this.decodeToken(token);
    return decoded?.sub;
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) return null;
    const decoded = this.decodeToken(token);
    console.log('Decoded Token:', decoded);
    return decoded?.userId || decoded?.id;
  }

  // User data operations
  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>(`${this.apiUrl}/shared_D_A/getAllUsers`, { headers });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/shared_All/getUserById/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => error);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const userId = this.getCurrentUserId();
    console.log('Current User ID:', userId);
    if (!userId) {
      return throwError(() => new Error('No user logged in'));
    }
    return this.getUserById(userId);
  }

  getCurrentUserpatient(): Observable<User> {
    console.log('hello');
    const userId = this.getCurrentUserId();
    console.log('Current User ID:', userId);
    if (!userId) {
      return throwError(() => new Error('No user logged in'));
    }
    return this.http.get<User>(`${this.apiUrl}/shared_All/getUserById/${userId}`).pipe(
      map((response: any) => ({
        id: response.id,
        firstname: response.firstname,
        lastname: response.lastname,
        username: response.username,
        email: response.email,
        role: response.role,
        avatarUrl: response.avatarUrl,
        accountStatus: response.accountStatus,
        lastSessionDate: response.lastSessionDate ? new Date(response.lastSessionDate) : undefined,
        primaryCarePhysician: response.primaryCarePhysician,
        nextAppointment: response.nextAppointment ? new Date(response.nextAppointment) : undefined,
        birth: response.birth ? new Date(response.birth) : undefined
      }))
    );
  }

  // Update operations
  updateUseradmin(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (!userData.currentUsername) {
      throw new Error('Current username is required for update');
    }

    const roleValue = userData.role.replace('ROLE_', '');
    const url = `${this.apiUrl}/shared_D_A/updateRole/${encodeURIComponent(userData.currentUsername)}/role?newRole=${roleValue}`;

    return this.http.put(url, {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      username: userData.username
    }, {
      headers,
      responseType: 'text'
    });
  }

  updateUserpatient(userData: any, username: String): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('hellllllo:', token);
    console.log('User data:', userData);
    console.log('Username:', username);

    if (!username) {
      throw new Error('Current username is required for update');
    }

    const url = `${this.apiUrl}/shared_All/updateUser/${username}`;

    return this.http.put(url, {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      username: userData.username,
      birth: userData.birth,
    }, {
      headers,
      responseType: 'text'
    });
  }

  // Delete operation
  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(
      `${this.apiUrl}/shared_D_A/deleteUserById/${userId}`,
      {
        headers,
        responseType: 'text'
      }
    );
  }

  // Search and analytics
  searchUsers(query: string): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User[]>(`${this.apiUrl}/shared_D_A/search`, {
        params: { query },
         headers
    });
}

  getUserStats(): Observable<any> {
    const url = `${this.apiUrl}/admin/analytics/user-stats`;
    return this.http.get(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
