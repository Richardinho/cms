import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { GeneralGuard } from './general.guard';

describe('GeneralGuard', () => {
  let guard;
  let authServiceStub;
  let routerSpy;
  let nextStub;
  let stateStub;

  beforeEach(() => {
    authServiceStub = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    nextStub = {} as ActivatedRouteSnapshot;
    stateStub = {} as RouterStateSnapshot;
  });

  describe('when user is logged in', () => {
    it('should return true', () => {
      authServiceStub = jasmine.createSpyObj({
        isLoggedIn: true
      });

      guard = new GeneralGuard(authServiceStub, routerSpy);
      const result = guard.canActivate(nextStub, stateStub);

      expect(result).toBe(true);
    });
  });

  describe('when user is NOT logged in', () => {
    it('should return false and redirect to login page', () => {
      authServiceStub = jasmine.createSpyObj({
        isLoggedIn: false
      });

      guard = new GeneralGuard(authServiceStub, routerSpy);
      const result = guard.canActivate(nextStub, stateStub);

      expect(result).toBe(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
