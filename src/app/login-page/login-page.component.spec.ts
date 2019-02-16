import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing'; 
import { AuthService } from '../auth/auth.service';
import { of, defer } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('LoginPageComponent', () => {
  let authServiceSpy;
  let routerSpy;
  let httpSpy;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setToken', 'logOut']);
    httpSpy.post.and.returnValue(of({
      jwt_token: 'blah',
    }));
  });

  describe('when the user submits a correct username and password', () => {
    describe('and there is NOT a stored redirect url', () => {
      it('should set the jwt token and redirect to url', () => {
        TestBed.configureTestingModule({
          declarations: [
            LoginPageComponent
          ],
          providers: [
            { provide: HttpClient, useValue: httpSpy },
            { provide: Router, useValue: routerSpy },
            { provide: AuthService, useValue: authServiceSpy },
          ],
          imports: [
            ReactiveFormsModule,
            BrowserModule,
          ]
        });

        fixture = TestBed.createComponent(LoginPageComponent);
        const component = fixture.debugElement.componentInstance;

        //  When
        component.onSubmit();

        //  Then
        expect(authServiceSpy.setToken).toHaveBeenCalledWith('blah');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
      });
    });

    describe('and there is a stored redirect url', () => {
      it('should set the jwt token and redirect to home page', () => {
        TestBed.configureTestingModule({
          declarations: [
            LoginPageComponent
          ],
          providers: [
            { provide: HttpClient, useValue: httpSpy },
            { provide: Router, useValue: routerSpy },
            { provide: AuthService, useValue: authServiceSpy }
          ],
          imports: [
            ReactiveFormsModule,
            BrowserModule
          ]
        });

        fixture = TestBed.createComponent(LoginPageComponent);
        const component = fixture.debugElement.componentInstance;

        component.authService.redirectUrl = '/foobar';
        //  When
        component.onSubmit();
        //  Then
        expect(authServiceSpy.setToken).toHaveBeenCalledWith('blah');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/foobar']);
      });
    });
  });

  describe('when the user submits an incorrect username and password', () => {
    it('should show error message', async(() => {
      //  Given
      const errorResponse = {
        status: 403,
      };

      httpSpy.post.and.returnValue(asyncError(errorResponse));

      TestBed.configureTestingModule({
        declarations: [
          LoginPageComponent
        ],
        providers: [
          { provide: HttpClient, useValue: httpSpy },
          { provide: Router, useValue: routerSpy },
          { provide: AuthService, useValue: authServiceSpy }
        ],
        imports: [
          ReactiveFormsModule,
          BrowserModule
        ]
      });

      fixture = TestBed.createComponent(LoginPageComponent);
      const component = fixture.debugElement.componentInstance;

      //  When
      component.onSubmit();

      fixture.whenStable().then(() => {
        //  Then
        expect(component.errorMessage).toBe('Your submitted username and password were wrong');
      });
    }));
  });

  describe('when some other error occurs', () => {
    it('should show generic error', async(() => {
      //  Given
      const errorResponse = {};
      httpSpy.post.and.returnValue(asyncError(errorResponse));

      TestBed.configureTestingModule({
        declarations: [
          LoginPageComponent
        ],
        providers: [
          { provide: HttpClient, useValue: httpSpy },
          { provide: Router, useValue: routerSpy },
          { provide: AuthService, useValue: authServiceSpy }
        ],
        imports: [
          ReactiveFormsModule,
          BrowserModule
        ]
      });

      fixture = TestBed.createComponent(LoginPageComponent);
      const component = fixture.debugElement.componentInstance;

      //  When
      component.onSubmit();

      //  Then
      fixture.whenStable().then(() => {
        expect(component.errorMessage).toBe('Some other error occurred');
      });
    }));
  });
});

