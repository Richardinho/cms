import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { EditArticlePageComponent } from './edit-article-page.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { of, throwError } from 'rxjs';

const mockArticle = {
  id: 3,
  title: 'Hello world',
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
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = new ActivatedRouteStub(mockParams);
  });

  describe('on page load', () => {
    it('should fetch article from service', () => {
      //  Given
      articleServiceSpy.getArticle.and.returnValue(of(mockArticle));
      component = new EditArticlePageComponent(activatedRouteStub, routerSpy, articleServiceSpy);

      //  When
      component.ngOnInit();

      //  Then
      expect(component.article).toEqual(mockArticle);
    });

    describe('if user is not logged in', () => {
      it('should redirect to login page', () => {
        //  Given
        articleServiceSpy.getArticle.and.returnValue(throwError({
          status: 401
        }));

        component = new EditArticlePageComponent(activatedRouteStub, routerSpy, articleServiceSpy);

        //  When
        component.ngOnInit();

        //  Then
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      });
    }); 

    describe('if some other error occurs', () => {
      it('should show generic error message', () => {
        //  Given
        articleServiceSpy.getArticle.and.returnValue(throwError({}));

        component = new EditArticlePageComponent(activatedRouteStub, routerSpy, articleServiceSpy);

        //  When
        component.ngOnInit();

        //  Then
        expect(component.errorMessage).toBe('an error occurred');
      });
    });
  });
});
