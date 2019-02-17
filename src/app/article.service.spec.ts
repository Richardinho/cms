import { of, throwError } from 'rxjs';
import { ArticleService } from './article.service';

const mockArticles = [
  { title: 'apple' },
  { title: 'banana' },
];

describe('ArticleService', () => {
  let service: ArticleService;
  let authServiceSpy;
  let httpSpy;

  describe('getArticle()', () => {
    beforeEach(() => {
      httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
      authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    });

    it('should emit an article', () => {
      //  Given
      httpSpy.get.and.returnValue(of(mockArticles[1]));
      service = new ArticleService(httpSpy, authServiceSpy);

      //  When
      service.getArticle('').subscribe(article => {
        //  Then
        expect(article.title).toBe('banana');
      });
    });

    describe('when an error occurs', () => {
      it('should emit an error message', () => {
        //  Given
        httpSpy.get.and.returnValue(throwError({}));
        service = new ArticleService(httpSpy, authServiceSpy);

        //  When
        service.getArticle('').subscribe(article => {
        }, e => {
          //  Then
          expect(e.message).toBe('an error occurred');
        });
      });
    });

    describe('when an error status code returns from the server', () => {
      it('should emit error with status code', () => {
        //  Given
        httpSpy.get.and.returnValue(throwError({ status: 500 }));
        service = new ArticleService(httpSpy, authServiceSpy);

        //  When
        service.getArticle('').subscribe(article => {
        }, e => {
          //  Then
          expect(e.status).toBe(500);
        });
      });
    });
  });

  describe('getArticles()', () => {
    beforeEach(() => {
      httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
      authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    });

    it('should emit an articles array', () => {
      //  Given
      httpSpy.get.and.returnValue(of({ articles: mockArticles }));
      service = new ArticleService(httpSpy, authServiceSpy);

      //  When
      service.getArticles().subscribe((articles) => {
        //  Then
        expect(articles.length).toBe(2);
      });
    });

    describe('when an error occurs', () => {
      it('should emit error message', () => {
        //  Given
        httpSpy.get.and.returnValue(throwError({}));
        service = new ArticleService(httpSpy, authServiceSpy);

        //  When
        service.getArticles().subscribe((articles) => {
        }, (e) => {
          //  Then
          expect(e.message).toBe('an error occurred');
        });
      });
    });

    describe('when an error status code returns from server', () => {
      it('should emit error with status code', () => {
        //  Given
        httpSpy.get.and.returnValue(throwError({ status: 500 }));
        service = new ArticleService(httpSpy, authServiceSpy);

        //  When
        service.getArticles().subscribe((articles) => {
        }, (e) => {
          //  Then
          expect(e.status).toBe(500);
        });
      });
    });
  });
});






