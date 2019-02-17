import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing'; 
import { AuthService } from '../auth/auth.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let authServiceSpy;
  let routerSpy;
  let httpSpy;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setToken', 'logOut']);
  });

  
  describe('when the user submits a correct username and password', () => {
    beforeEach(() => {
      httpSpy.post.and.returnValue(of({
        jwt_token: 'blah',
      }));
    });

    describe('and there is NOT a stored redirect url', () => {
      it('should set the jwt token and redirect to url', () => {
        //  Given
        const component = new LoginPageComponent(httpSpy, routerSpy, authServiceSpy);

        //  When
        component.onSubmit();

        //  Then
        expect(authServiceSpy.setToken).toHaveBeenCalledWith('blah');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
      });
    });

    describe('and there is a stored redirect url', () => {
      it('should set the jwt token and redirect to home page', () => {
        //  Given
        authServiceSpy.redirectUrl = '/foobar';
        const component = new LoginPageComponent(httpSpy, routerSpy, authServiceSpy);

        //  When
        component.onSubmit();

        //  Then
        expect(authServiceSpy.setToken).toHaveBeenCalledWith('blah');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/foobar']);
      });
    });
  });

  describe('when the user submits an incorrect username and password', () => {
    it('should show error telling the user that they submitted the wrong username/password pair', () => {
      //  Given
      const errorResponse = {
        status: 403,
      };

      httpSpy.post.and.returnValue(throwError(errorResponse));

      const component = new LoginPageComponent(httpSpy, routerSpy, authServiceSpy);

      //  When
      component.onSubmit();

      //  Then
      expect(component.errorMessage).toBe('Your submitted username and password were wrong');
     });
  });

  describe('when some other error occurs', () => {
    it('should show generic error', async(() => {
      //  Given
      const errorResponse = {};
      httpSpy.post.and.returnValue(throwError(errorResponse));

      const component = new LoginPageComponent(httpSpy, routerSpy, authServiceSpy);

      //  When
      component.onSubmit();

      //  Then
      expect(component.errorMessage).toBe('Some other error occurred');
    }));
  });
});

