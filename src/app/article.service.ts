import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Array<Article>> {
    const url = 'http://october.richardhunter.co.uk/index.php/api/articles/';

    return this.http.get<any>(url)
      .pipe(map(data => {
        return data.articles;
      }));
  }

  getArticle(id: number | string) {
    const url = 'http://october.richardhunter.co.uk/index.php/api/article/' + id;

    return this.http.get(url);
  }
}
