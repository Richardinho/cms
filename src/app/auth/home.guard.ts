import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { AppState, Article } from '../model';

export const jwtSelector = (state: AppState) => state.jwt_token;

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //  todo: create timer for login and log user out when it expires
      /*
       * problem here is that this just checks if we have a jwt token. It can't check if it's currently valid
       */

      return true;

      const loggedIn = this.store.select(jwtSelector);

      if (!loggedIn) {
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);

        return false;
      } else {
        return true;
      }
  }
}
