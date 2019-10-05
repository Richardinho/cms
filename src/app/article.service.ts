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

  tagData: string[] = ['angular', 'javascript', 'css', 'react'];

  /*
   *  true if there is an article with unsaved changes in the app
   *  So that guards can access this information
   */


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  hasUnsavedChanges(articleId) {
    return !!this.unsavedArticles[articleId];
  }

  deleteUnsavedArticle(articleId) {
    if (this.hasUnsavedChanges(articleId)) {
      delete this.unsavedArticles[articleId];
    }
  }

  deleteArticle(articleId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`, 
        'enctype': 'multipart/form-data'
      })
    }; 

    const url = environment.blogDomain + `/index.php/api/article/${articleId}`;

    return this.http.delete(url, httpOptions)
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

  /*
   *  updates published status of article on server
   */

  publish(articleId, publish) {
    const formData = new FormData();
    const url = environment.blogDomain + '/index.php/api/publish/' + articleId;

    formData.append('published', publish);

    return this.post(url, formData);
  }

  updateArticle(article) {
    const formData = new FormData();
    const selectedTags = [];

    //  save article in local cache
    this.unsavedArticles[article.id] = article;

    const url = environment.blogDomain + '/index.php/api/article/' + article.id;

    article.tags.forEach((tag, index) => {
      if (tag && selectedTags.length <= 3) {
        selectedTags.push(this.tagData[index]);
      }
    });

    formData.append('body', article.body);
    formData.append('title', article.title);
    formData.append('summary', article.summary);
    formData.append('published', article.published);

    selectedTags.forEach((tag, index) => {
      formData.append(`tag${index + 1}`, tag);
    });

    return this.post(url, formData);
  }

  post(url, formData) {
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
