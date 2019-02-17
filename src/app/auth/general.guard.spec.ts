import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { GeneralGuard } from './general.guard';

describe('GeneralGuard', () => {
  let guard;
  let authServiceSpy;
  let routerSpy;
  let nextStub;
  let stateStub;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    nextStub = {} as ActivatedRouteSnapshot;
    stateStub = {} as RouterStateSnapshot;
  });

  describe('when user is logged in', () => {
    it('should return true', () => {
      //  Given
      authServiceSpy.isLoggedIn.and.returnValue(true);
      guard = new GeneralGuard(authServiceSpy, routerSpy);

      //  When
      const result = guard.canActivate(nextStub, stateStub);

      //  Then
      expect(result).toBe(true);
    });
  });

  describe('when user is NOT logged in', () => {
    it('should return false and redirect to login page', () => {
      //  Given
      authServiceSpy.isLoggedIn.and.returnValue(false);
      guard = new GeneralGuard(authServiceSpy, routerSpy);

      //  When
      const result = guard.canActivate(nextStub, stateStub);

      //  Then
      expect(result).toBe(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
