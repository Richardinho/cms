import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../article';

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {
  article: Article;
  article$:Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService) {}

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.articleService.getArticle(params.get('id'));
      })
    );

    this.article$.subscribe(article => {
      this.article = article; 
    });
  }

}
