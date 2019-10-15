import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      /*
       * problem here is that this just checks if we have a jwt token. It can't check if it's currently valid
       */

      const loggedIn = this.authService.isLoggedIn();

      if (!loggedIn) {
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);

        return false;
      } else {
        return true;
      }
  }
}
