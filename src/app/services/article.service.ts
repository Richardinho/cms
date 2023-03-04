import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Article } from '../model';
import { environment } from '../../environments/environment';
import { articleToFormData } from '../utils/article-to-form-data';

// todo: this should probably live in store? For example, I should be able to
// configure this within the CMS: add, remove tags etc.
export const tagData: string[] = [
  'angular',
  'css',
  'html-5',
  'javascript',
  'react',
];

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  tagData: string[] = tagData;

  constructor(private http: HttpClient) {}

  getArticle(id: number | string, token: string) {
    const url = environment.blogDomain + '/index.php/api/article/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${token}`,
      }),
    };

    return this.http.get<any>(url, httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status) {
          return throwError({
            status: error.status,
          });
        } else {
          return throwError({
            message: 'an error occurred',
          });
        }
      })
    );
  }

  getArticles(token: any): Observable<Array<Article>> {
    console.log('get articles');
    const url = environment.blogDomain + '/index.php/api/articles/';

    return this._get(url, token).pipe(
      map((data) => {
        return data.articles;
      })
    );
  }

  createArticle(token: any) {
    const formData = new FormData();

    const url = environment.blogDomain + '/index.php/api/article/';

    const httpOptions = {
      // should I used Basic here?
      headers: new HttpHeaders({
        Authorization: `Basic ${token}`,
        enctype: 'multipart/form-data',
      }),
    };

    return this.http
      .put<any>(url, formData, httpOptions)
      .pipe(map((data) => data.id));
  }

  updateArticle(article: Article, token: any) {
    const url = environment.blogDomain + '/index.php/api/article/' + article.id;
    const formData: FormData = articleToFormData(article);

    return this._post(url, formData, token);
  }

  deleteArticle(articleId: any, token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${token}`,
        enctype: 'multipart/form-data',
      }),
    };

    const url = environment.blogDomain + `/index.php/api/article/${articleId}`;

    return this.http.delete(url, httpOptions);
  }

  publish(articleId: any, publish: any, token: any) {
    console.log('publish', articleId, publish, token);
    const formData = new FormData();
    const url = environment.blogDomain + '/index.php/api/publish/' + articleId;

    formData.append('published', publish);

    return this._post(url, formData, token);
  }

  _get(url: any, token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${token}`,
      }),
    };

    return this.http.get<any>(url, httpOptions);
  }

  _post(url: any, formData: any, token: any) {
    if (!token) {
      return throwError({
        message: 'You are not logged in. No JWT token in localStorage',
        status: 401,
      });
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Basic ${token}`,
          enctype: 'multipart/form-data',
        }),
      };

      return this.http.post<any>(url, formData, httpOptions).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status,
            });
          } else {
            return throwError({
              message: 'an error occurred',
            });
          }
        })
      );
    }
  }
}
