import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import {
  NETWORK_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  ARTICLE_MISSING_ERROR_MESSAGE,
  EditArticlePageComponent
} from './edit-article-page.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { of, throwError } from 'rxjs';

const mockArticle = {
  id: 3,
  title: 'Hello world',
  summary: 'summary',
  body: 'its the end of the world as we know it',
};

const mockParams = {
  id: 5,
}

describe('EditArticlePageComponent', () => {
  let component;
  let articleServiceStub;
  let routerStub;
  let activatedRouteStub;
  let messageServiceStub;
  let authServiceStub;
  let dialogServiceStub;

  beforeEach(() => {
    articleServiceStub = jasmine.createSpyObj('ArticleService', ['getArticle', 'updateArticle']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = new ActivatedRouteStub(mockParams);
    messageServiceStub = jasmine.createSpyObj('MessageService', ['show']);
    authServiceStub = jasmine.createSpyObj('AuthService', ['']);
    dialogServiceStub = jasmine.createSpyObj('DialogService', ['']);
  });

  describe('saveEdit()', () => {
    it('should save article and show messages.', () => {
      articleServiceStub = jasmine.createSpyObj('ArticleService', {
        updateArticle: of({})
      });

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerStub,
        authServiceStub, 
        articleServiceStub,
        messageServiceStub,
        dialogServiceStub);

      component.saveEdit();
      
      expect(articleServiceStub.updateArticle).toHaveBeenCalled();
      expect(messageServiceStub.show).toHaveBeenCalledWith('article was saved');
    });
  });

  describe('ngOnInit() when user is logged in', () => {
    beforeEach(() => {
      articleServiceStub.getArticle.and.returnValue(of(mockArticle));

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerStub,
        authServiceStub, 
        articleServiceStub,
        messageServiceStub);

      component.ngOnInit();
    });

    it('should fetch article from service', () => {
      expect(component.article).toEqual(mockArticle);
    });

    it('should set article title into form control', () => {
      expect(component.editArticleTitleFormControl.value).toBe('Hello world');
    });

    it('should set summary into form control', () => {
      expect(component.editArticleSummaryFormControl.value).toBe('summary');
    });

    it('should set article body into form control', () => {
      expect(component.editArticleBodyFormControl.value).toBe('its the end of the world as we know it');
    });
  });

  describe('ngOnInit() when user is not logged in', () => {
    beforeEach(() => {
      articleServiceStub = jasmine.createSpyObj('ArticleService', {
        getArticle: throwError({ status: 401 })
      });

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerStub,
        authServiceStub,
        articleServiceStub,
        messageServiceStub
      );

      component.ngOnInit();
    });

    it('should redirect to login page', () => {
      expect(routerStub.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should save this url to allow redirecting back later', () => {
      expect(component.authService.redirectUrl).toBe('/edit-article/5');
    });
  });

  describe('ngOnInit() when article does not exist', () => {
    beforeEach(() => {
      articleServiceStub = jasmine.createSpyObj('ArticleService', {
        getArticle: throwError({ status: 404 })
      });

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerStub,
        authServiceStub,
        articleServiceStub,
        messageServiceStub);

      component.ngOnInit();
    });
    
    it('should show error message relating to missing article', () => {
      expect(messageServiceStub.show)
        .toHaveBeenCalledWith(ARTICLE_MISSING_ERROR_MESSAGE);
    });
  });

  describe('when server error occurs', () => {
    beforeEach(() => {
      articleServiceStub = jasmine.createSpyObj('ArticleService', {
        getArticle: throwError({ status: 500})
      });

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerStub,
        authServiceStub,
        articleServiceStub,
        messageServiceStub);

      component.ngOnInit();
    });

    it('should show error message relating to server', () => {
      expect(messageServiceStub.show)
        .toHaveBeenCalledWith(SERVER_ERROR_MESSAGE);
    });
  });

  describe('if network is down', () => {
    it('should show error message relating to network', () => {
      articleServiceStub = jasmine.createSpyObj('ArticleService', {
        getArticle: throwError({})
      });

      component = new EditArticlePageComponent(
        activatedRouteStub,
        routerStub,
        authServiceStub,
        articleServiceStub,
        messageServiceStub
      );

      component.ngOnInit();

      expect(messageServiceStub.show)
        .toHaveBeenCalledWith(NETWORK_ERROR_MESSAGE);
    });
  });

});
