import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Auth Guard - User:', this.authService.user);
    console.log('Auth Guard - Token:', this.authService.token);

    if (!this.authService.user || !this.authService.token) {
      console.log('Auth Guard - No user or token, redirecting to login');
      this.authService.logout();
      return false;
    }
    let token = this.authService.token;
    let expiration = JSON.parse(atob(token.split('.')[1])).exp;
    if (Math.floor(new Date().getTime() / 1000) >= expiration) {
      this.authService.logout();
      return false;
    }
    return true;
  }
}
