import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../Services/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token && !this.auth.isTokenValid(token)) {
      this.auth.logout();
      this.router.navigate(['/'], {
        queryParams: { sessionConflict: true }
      });
      return throwError(() => new Error('Session invalidated'));
    }

    const authReq = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
      : req;

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigate(['/'], {
            queryParams: { sessionConflict: true }
          });
        }
        return throwError(() => err);
      })
    );
  }
}
