import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Article } from '../article';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DialogService } from '../auth/dialog.service';

const CONFIRMATION_MESSAGE = 'Are you sure that you want to delete this article?';
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
    private articleService: ArticleService,
    private dialogService: DialogService,
  ) {}

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

  deleteArticle() {
    function handleSuccess() {
      this.router.navigate(['/home']);
    }

    function handleError(error) {
      console.log('error', error);
    }

    this.dialogService.confirm(CONFIRMATION_MESSAGE)
      .subscribe((canDelete) => {
        if (canDelete) {
          this.articleService
            .deleteArticle(this.articleId)
            .subscribe(handleSuccess.bind(this), handleError);

        }
      });
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
