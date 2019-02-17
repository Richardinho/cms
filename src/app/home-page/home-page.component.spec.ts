import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Article } from '../article';
import { Observable } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { Router } from '@angular/router';

const stubArticles = [
  { id: 3, title: 'this is foo' }
];

describe('HomePageComponent', () => {
  let component: HomePageComponent;

  beforeEach(() => {
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    articleServiceSpy.getArticles.and.returnValue(of(stubArticles as Array<Article>));
    component = new HomePageComponent(articleServiceSpy, routerSpy);
    component.ngOnInit();
  });

  it('should get articles from server on init', () => {
    expect(component.articles).toEqual(stubArticles);
  });
});

class StubArticleService {

  getArticles(): Observable<Array<Article>> {
  
    return of(stubArticles);
  }
}
describe('rendering template', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
      ],
      providers: [
        {
          provide: ArticleService,
          useClass: StubArticleService,
        }, 
        { 
          provide: Router, 
          useValue: routerSpy,
        }
      ],

      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
  });

  it('should render article links', () => {
    const links = fixture.nativeElement.querySelectorAll('.link');
    expect(links[0].querySelector('span').textContent).toBe('this is foo');
  });
});
