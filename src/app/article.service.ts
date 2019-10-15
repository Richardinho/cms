import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from './article';
import { AuthService } from './auth/auth.service';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { articleToFormData } from './utils/article-to-form-data';

export const tagData: string[] = ['angular', 'javascript', 'css', 'react', 'html-5'];

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  tagData: string[] = tagData;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getArticle(id: number | string) {
    const url = environment.blogDomain + '/index.php/api/article/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`,
      })
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status
            });
          } else {
            return throwError({
              message: 'an error occurred'
            });
          }
        })
      );
  }

  getArticles(): Observable<Array<Article>> {
    const url = environment.blogDomain + '/index.php/api/articles/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`,
      })
    };

    return this.http.get<any>(url, httpOptions).pipe(
      map(data => {
        return data.articles;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status) {
          return throwError({
            status: error.status
          });
        } else {
          return throwError({
            message: 'an error occurred'
          });
        }
      })
    );
  }

  create() {
    const formData = new FormData();

    const url = environment.blogDomain + '/index.php/api/article/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`,
        'enctype': 'multipart/form-data'
      })
    };

    return this.http
      .put<any>(url, formData, httpOptions)
      .pipe(map(data => data.id));
  }

  updateArticle(article: Article) {
    const url = environment.blogDomain + '/index.php/api/article/' + article.id;
    const formData: FormData = articleToFormData(article);

    return this._post(url, formData);
  }

  deleteArticle(articleId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`,
        'enctype': 'multipart/form-data'
      })
    };

    const url = environment.blogDomain + `/index.php/api/article/${articleId}`;

    return this.http.delete(url, httpOptions);
  }

  publish(articleId, publish) {
    const formData = new FormData();
    const url = environment.blogDomain + '/index.php/api/publish/' + articleId;

    formData.append('published', publish);

    return this._post(url, formData);
  }

  _post(url, formData) {
    const token = this.authService.getToken();

    if (!token) {

      return throwError({
        message: 'You are not logged in. No JWT token in localStorage',
        status: 401,
      });

    } else {

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${token}`,
          'enctype': 'multipart/form-data'
        })
      };

      return this.http.post<any>(url, formData, httpOptions).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status
            });
          } else {
            return throwError({
              message: 'an error occurred'
            });
          }
        })
      );
    }
  }
}
