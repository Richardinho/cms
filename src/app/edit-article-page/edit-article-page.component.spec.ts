import { Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { EditArticlePageComponent } from './edit-article-page.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { defer, of } from 'rxjs';


@Pipe({ name: 'markdownToHTML' })
class MockMarkdownToHTMLPipe {
  transform(): string {
    return 'hello world';
  }
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('EditArticlePageComponent', () => {
  let component: EditArticlePageComponent;
  let fixture: ComponentFixture<EditArticlePageComponent>;

  let articleServiceSpy;
  let routerSpy;

  describe('when the user is not logged in', () => {
  
    beforeEach(async(() => {
      //  Given
      articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle']);
      const errorResponse = {
        status: 401
      };
      articleServiceSpy.getArticle.and.returnValue(asyncError(errorResponse));
    
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [
          EditArticlePageComponent,
          MockMarkdownToHTMLPipe,
        ],
        providers: [
          { provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: 5}) },
          { provide: Router, useValue: routerSpy },
          { provide: ArticleService, useValue: articleServiceSpy },
        ]
      }).compileComponents();

      //  When 
      fixture = TestBed.createComponent(EditArticlePageComponent);

      fixture.detectChanges();
    }));
  
    it('should redirect user to login page', () => {
      //  Then
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('when any other kind of error occurs', () => {
    it('should display an error message', async(() => {
      //  Given
      articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle']);
      const errorResponse = {};
      articleServiceSpy.getArticle.and.returnValue(asyncError(errorResponse)); 
    
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [
          EditArticlePageComponent,
          MockMarkdownToHTMLPipe,
        ],
        providers: [
          { provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: 5 })},
          { provide: Router, useValue: routerSpy },
          { provide: ArticleService, useValue: articleServiceSpy },
        ]
      }).compileComponents();

      //  When
      fixture = TestBed.createComponent(EditArticlePageComponent);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //  Then
        expect(fixture.nativeElement.querySelector('.error-message')
          .textContent).toBe('an error occurred');
      });
    }));
  });

  describe('when an valid article exists', () => {
    beforeEach(async(() => {
      //  Given
      const stubArticle = { id: 3, title: 'this is foo' };
      articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle']);
      articleServiceSpy.getArticle.and.returnValue(of(stubArticle as Article));

      routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [
          EditArticlePageComponent, 
          MockMarkdownToHTMLPipe,
        ],
        providers: [
          { provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: 5}) },
          { provide: Router, useValue: routerSpy },
          { provide: ArticleService, useValue: articleServiceSpy },
        ],
      })
        .compileComponents();
    }));

    beforeEach(() => {
      //  When 
      fixture = TestBed.createComponent(EditArticlePageComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should fetch article from service', () => {
      //  Then
      expect(articleServiceSpy.getArticle).toHaveBeenCalledWith(5);
      expect(component.article).toEqual({ id: 3, title: 'this is foo'});
      expect(fixture.nativeElement.querySelector('.article-content')
        .textContent).toBe('hello world');
    });
  });
});
