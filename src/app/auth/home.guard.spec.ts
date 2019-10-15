import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { HomeGuard } from './home.guard';

describe('HomeGuard', () => {
  let authServiceStub;
  let routerSpy;
  const next;
  const state;
  let guard;
  let result;

  beforeEach(() => {
    authServiceStub = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  describe('when user is logged in', () => {
    it('should return true', () => {
      authServiceStub = jasmine.createSpyObj({
        isLoggedIn: true,
      });

      guard = new HomeGuard(authServiceStub, routerSpy);
      result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(true);
    });
  });

  describe('when user is NOT logged in', () => {
    beforeEach(() => {
      authServiceStub = jasmine.createSpyObj({
        isLoggedIn: false,
      });

      guard = new HomeGuard(authServiceStub, routerSpy);
      result = guard.canActivate({} as ActivatedRouteSnapshot, { url: '/foo'} as RouterStateSnapshot);
    });

    it('should return false', () => {
      expect(result).toBe(false);
    });

    it('should save redirect url', () => {
      expect(authServiceStub.redirectUrl).toBe('/foo');
    });

    it('should navigate to login page', () => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
