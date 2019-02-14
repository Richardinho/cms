import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {
  article: Article;
  article$:Observable<any>;

  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService) {}

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.articleService.getArticle(params.get('id'));
      })
    );

    this.article$.subscribe(article => {
      this.article = article; 
    }, (e) => {
      /*
       *  if error is 401, we redirect to login page. Otherwise we show an error message
       */
      if (e.status && e.status === 401) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'an error occurred';
      }
    });
  }
}
