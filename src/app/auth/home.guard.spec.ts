import { TestBed, async, inject } from '@angular/core/testing';
import {
  NavigationExtras,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { HomeGuard } from './home.guard';


describe('HomeGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        HomeGuard,
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    });
  });

  describe('when user is logged in', () => {
    it('should return true', inject([HomeGuard], (guard: HomeGuard) => {
      //  Get
      const authService = TestBed.get(AuthService);
      authService.isLoggedIn.and.returnValue(true);

      //  When
      const result = guard.canActivate(
        {} as ActivatedRouteSnapshot,
        { url: '/home' } as RouterStateSnapshot );

      //  Then
      expect(result).toBe(true);
    }));
  });

  describe('when user is NOT logged in', () => {
    it('should save redirect url, navigate to login page, and return false', inject([HomeGuard], (guard: HomeGuard) => {
      //  Get
      const authService = TestBed.get(AuthService);
      const router = TestBed.get(Router);
      authService.isLoggedIn.and.returnValue(false);

      //  When
      const result = guard.canActivate(
        {} as ActivatedRouteSnapshot,
        { url: '/home' } as RouterStateSnapshot );

      //  Then
      expect(authService.redirectUrl).toBe('/home');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(result).toBe(false);
    }));
  });
});
