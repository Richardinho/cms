import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from './article';
import { AuthService } from './auth/auth.service';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  unsavedArticles = {};

  /*
   *  true if there is an article with unsaved changes in the app
   *  So that guards can access this information
   */

  hasUnsavedChanges = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  updateArticle(article) {
    const formData = new FormData();
    formData.append('body', article.body);

    const token = this.authService.getToken();

    //  store unsaved articles
    this.unsavedArticles[article.id] = article;

    if (!token) {
      return throwError({
        message: 'You are not logged in. No JWT token in localStorage',
        status: 401,
      });
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`, 
        'enctype': 'multipart/form-data'
      })
    }; 

    const url = environment.blogDomain + '/index.php/api/article/' + article.id;

    return this.http.post<any>(url, formData, httpOptions).pipe(
      map(data => {
        return {
          data: data,
          text: 'lalala',
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError({
          message: 'balahaha'
        });
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

  getArticle(id: number | string) {
    const url = environment.blogDomain + '/index.php/api/article/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`, 
      })
    }; 

    if (this.unsavedArticles[id]) {
      const a = this.unsavedArticles[id];
      delete this.unsavedArticles[id];

      return of(a);
    }

    /*
     * possible errors:
     * 1. network failure
     * 2. server failure (500)
     * 3. authentication failure  (413)
     * 4. article not found
     *
     */

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map((data,foo) => {
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
}
