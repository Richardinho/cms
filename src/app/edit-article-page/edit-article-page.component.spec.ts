import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import {
  NETWORK_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  ARTICLE_MISSING_ERROR_MESSAGE,
  SHOW_MESSAGE_DURATION,
  EditArticlePageComponent
} from './edit-article-page.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { of, throwError } from 'rxjs';

const mockArticle = {
  id: 3,
  title: 'Hello world',
  body: 'its the end of the world as we know it',
};

const mockParams = {
  id: 5,
}

describe('EditArticlePageComponent', () => {
  let component;
  let articleServiceSpy;
  let routerSpy;
  let activatedRouteStub;

  beforeEach(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle', 'updateArticle']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = new ActivatedRouteStub(mockParams);
  });

  describe('saveEdit()', () => {
    it('should save article and show messages.', fakeAsync(() => {
      articleServiceSpy.updateArticle.and.returnValue(of({}));
    
      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerSpy,
        {} as AuthService, 
        articleServiceSpy);

      component.articleService.hasUnsavedChanges = true;
      component.showArticleSavedMessage = false;

      component.saveEdit();

      expect(component.articleService.hasUnsavedChanges).toBe(false);
      expect(component.showArticleSavedMessage).toBe(true);

      tick(SHOW_MESSAGE_DURATION);

      expect(component.showArticleSavedMessage).toBe(false);
    }));
  });

  describe('ngOnInit()', () => {
    it('should fetch article from service', () => {
      articleServiceSpy.getArticle.and.returnValue(of(mockArticle));

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerSpy,
        {} as AuthService, 
        articleServiceSpy);

      component.ngOnInit();

      expect(component.article).toEqual(mockArticle);
      expect(component.editArticleFormControl.value).toBe('its the end of the world as we know it');
    });

    describe('when user is not logged in', () => {
      it('should redirect to login page and save this url to allow app to redirect back here later', () => {
        articleServiceSpy.getArticle.and.returnValue(throwError({
          status: 401
        }));
      
        component = new EditArticlePageComponent(
          activatedRouteStub,
          routerSpy,
          {} as AuthService,
          articleServiceSpy);

        component.ngOnInit();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
        expect(component.authService.redirectUrl).toBe('/edit-article/5');
      });
    });

    describe('when article does not exist', () => {
      it('should show error message relating to missing article', () => {
        articleServiceSpy.getArticle.and.returnValue(throwError({
          status: 404
        }));

        component = new EditArticlePageComponent(
          activatedRouteStub,
          routerSpy,
          {} as AuthService,
          articleServiceSpy);

        component.ngOnInit();

        expect(component.errorMessage).toBe(ARTICLE_MISSING_ERROR_MESSAGE);
      });
    });

    describe('when server error occurs', () => {
      it('should show error message relating to server', () => {
        articleServiceSpy.getArticle.and.returnValue(throwError({
          status: 500 
        }));

        component = new EditArticlePageComponent(
          activatedRouteStub,
          routerSpy,
          {} as AuthService,
          articleServiceSpy);

        component.ngOnInit();

        expect(component.errorMessage).toBe(SERVER_ERROR_MESSAGE);
      });
    });

    describe('if network is down', () => {
      it('should show error message relating to network', () => {
        articleServiceSpy.getArticle.and.returnValue(throwError({}));

        component = new EditArticlePageComponent(
          activatedRouteStub,
          routerSpy,
          {} as AuthService,
          articleServiceSpy);

        component.ngOnInit();

        expect(component.errorMessage).toBe(NETWORK_ERROR_MESSAGE);
      });
    });
  });
});
