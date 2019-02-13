import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from './article';
import { AuthService } from './auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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

    return this.http.get<any>(url, httpOptions)
      .pipe(map(data => {
        return data.articles;
      }));
  }

  getArticle(id: number | string) {
    const url = 'http://october.richardhunter.co.uk/index.php/api/article/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${this.authService.getToken()}`, 
      })
    }; 
    return this.http.get<any>(url, httpOptions)
      .pipe(map(data => {
        return data;
      });
  }
}
