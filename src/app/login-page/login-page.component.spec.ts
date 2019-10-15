/*
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let authServiceStub;
  let routerStub;
  let httpStub;
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;

  beforeEach(() => {
    httpStub = jasmine.createSpyObj('HttpClient', ['post']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    authServiceStub = jasmine.createSpyObj('AuthService', ['setToken', 'logOut']);
  });

  describe('when the user submits a correct username and password', () => {
    beforeEach(() => {
      httpStub.post.and.returnValue(of({
        jwt_token: 'blah',
      }));
    });

    describe('and there is NOT a stored redirect url', () => {
      beforeEach(() => {
        component = new LoginPageComponent(httpStub, routerStub, authServiceStub);

        component.onSubmit();
      });

      it('should set the jwt token', () => {
        expect(authServiceStub.setToken).toHaveBeenCalledWith('blah');
      });

      it('it should redirect to url', () => {
        expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
      });
    });

    describe('and there is a stored redirect url', () => {
      beforeEach(() => {
        authServiceStub.redirectUrl = '/foobar';
        const component = new LoginPageComponent(httpStub, routerStub, authServiceStub);

        component.onSubmit();
      });

      it('should set the jwt token', () => {
        expect(authServiceStub.setToken).toHaveBeenCalledWith('blah');
      });

      it('should redirect to home page', () => {
        expect(routerStub.navigate).toHaveBeenCalledWith(['/foobar']);
      });
    });
  });

  describe('when the user submits an incorrect username and password', () => {
    it('should show error telling the user that they submitted the wrong username/password pair', () => {
      const errorResponse = {
        status: 403,
      };

      httpStub = jasmine.createSpyObj('HttpClient', {
        post: throwError(errorResponse)
      });

      const component = new LoginPageComponent(httpStub, routerStub, authServiceStub);

      component.onSubmit();

      expect(component.errorMessage).toBe('Your submitted username and password were wrong');
     });
  });

  describe('when some other error occurs', () => {
    it('should show generic error', async(() => {
      const errorResponse = {};

      httpStub = jasmine.createSpyObj('HttpClient', {
        post: throwError(errorResponse)
      });

      const component = new LoginPageComponent(httpStub, routerStub, authServiceStub);

      component.onSubmit();

      expect(component.errorMessage).toBe('Some other error occurred');
    }));
  });
});

*/
