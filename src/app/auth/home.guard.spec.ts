import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { HomeGuard } from './home.guard';


describe('HomeGuard', () => {
  let authServiceSpy;
  let routerSpy;
  let next;
  let state;
  let guard;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  describe('when user is logged in', () => {
    it('should return true', () => {
      //  Given
      authServiceSpy.isLoggedIn.and.returnValue(true);

      guard = new HomeGuard(authServiceSpy, routerSpy);

      //  When
      const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      //  Then
      expect(result).toBe(true);
    });
  });

  describe('when user is NOT logged in', () => {
    it('should save redirect url, navigate to login page, and return false', () => {
      //  Given
      authServiceSpy.isLoggedIn.and.returnValue(false);

      guard = new HomeGuard(authServiceSpy, routerSpy);

      //  When
      const result = guard.canActivate({} as ActivatedRouteSnapshot, { url: '/foo'} as RouterStateSnapshot);

      //  Then
      expect(authServiceSpy.redirectUrl).toBe('/foo');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      expect(result).toBe(false);
    });
  });
});
