import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ArticleService } from './article.service';

class HttpClientStub {
  get() {
    return of({
      articles: [{
        title: 'my article'
      }]});
  }
}

let service: ArticleService;

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        {
          provide: HttpClient,
          useClass: HttpClientStub,
        }
      ]
    });

    service = TestBed.get(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of articles', () => {
    service.getArticles().subscribe((articles) => {
      expect(articles[0].title).toBe('my article');
    });
  });
});
