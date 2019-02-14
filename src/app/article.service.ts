import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from './article';
import { AuthService } from './auth/auth.service';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getArticles(): Observable<Array<Article>> {
    const url = 'http://october.richardhunter.co.uk/index.php/api/articles/';

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
        if (error.error instanceof ErrorEvent) {
          return throwError({
            message: 'an error occurred'
          });
        } else {
          return throwError({
            status: error.status
          });
        }
      })
    );
  }

  getArticle(id: number | string) {
    const url = 'http://october.richardhunter.co.uk/index.php/api/article/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`, 
      })
    }; 

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(data => {
          return data;
        }), 
        catchError((error: HttpErrorResponse) => {
          if(error.error instanceof ErrorEvent) {
            return throwError({
              message: 'an error occurred'
            });
          } else {
            return throwError({
              status: error.status
            });
          }
        })
      );
  }
}
