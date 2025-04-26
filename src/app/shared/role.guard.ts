// role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['roles'];
    const userRole = this.auth.getCurrentUserRole();

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    if (!expectedRole.includes(userRole)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
