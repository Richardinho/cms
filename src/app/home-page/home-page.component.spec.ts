import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Article } from '../article';
import { Observable } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { Router } from '@angular/router';

const stubArticles = [
  { id: 3, title: 'this is foo' }
];

describe('when page loads', () => {
  let component: HomePageComponent;
  let articleServiceSpy;
  let routerSpy;

  beforeEach(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  describe('when user is logged in', () => {
    it('should fetch articles from service', () => {
      //  Given
      articleServiceSpy.getArticles.and.returnValue(of(stubArticles as Array<Article>));
      component = new HomePageComponent(articleServiceSpy, routerSpy);
      
      //  When
      component.ngOnInit();

      //  Then
      expect(component.articles.length).toBe(1);
      expect(component.articles[0].title).toBe('this is foo');
    });
  });

  describe('when user is not logged in', () => {
    it('should redirect to login page', () => {
      //  Given
      articleServiceSpy.getArticles.and.returnValue(throwError({ status: 401 }));

      component = new HomePageComponent(articleServiceSpy, routerSpy);
      
      //  When
      component.ngOnInit();

      //  Then
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('when some other error occurs', () => {
    it('should show generic error message', () => {
      //  Given
      articleServiceSpy.getArticles.and.returnValue(throwError({}));

      component = new HomePageComponent(articleServiceSpy, routerSpy);
      
      //  When
      component.ngOnInit();

      //  Then
      expect(component.errorMessage).toBe('Some error occurred');
    });
  });
});

