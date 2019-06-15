import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-view-article-page',
  templateUrl: './view-article-page.component.html',
  styleUrls: ['./view-article-page.component.scss']
})
export class ViewArticlePageComponent implements OnInit {
  article: Article;
  errorMessage: string;
  private articleId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.articleId = params.get('id');

        return this.articleService.getArticle(this.articleId);
      })
    ).subscribe(
      this.handleResponse.bind(this),
      this.handleError.bind(this));
  }

  handleResponse(article) {
    this.article = article; 
  }

  handleError(error) {
    if (error.status && error.status === 401) {
      this.authService.redirectUrl = '/view-article/' + this.articleId;

      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'an error occurred';
    }
  }
}
