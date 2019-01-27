import { Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { EditArticlePageComponent } from './edit-article-page.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { of } from 'rxjs';


@Pipe({ name: 'markdownToHTML' })
class MockMarkdownToHTMLPipe {
  transform(): string {
    return 'hello world';
  }
}

describe('EditArticlePageComponent', () => {
  let component: EditArticlePageComponent;
  let fixture: ComponentFixture<EditArticlePageComponent>;

  const stubArticle = { id: 3, title: 'this is foo' };
  let articleServiceSpy;

  beforeEach(async(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle']);
    articleServiceSpy.getArticle.and.returnValue(of(stubArticle as Article));

    TestBed.configureTestingModule({
      declarations: [
        EditArticlePageComponent, 
        MockMarkdownToHTMLPipe,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: 5}) },
        { provide: ArticleService, useValue: articleServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticlePageComponent);
    component = fixture.componentInstance;
    const activatedRoute = TestBed.get(ActivatedRoute);
    fixture.detectChanges();

  });

  it('should fetch article from service', () => {
    expect(articleServiceSpy.getArticle).toHaveBeenCalledWith(5);
    expect(component.article).toEqual({ id: 3, title: 'this is foo'});
    expect(fixture.nativeElement.querySelector('.article-content')
      .textContent).toBe('hello world');
  });
});
