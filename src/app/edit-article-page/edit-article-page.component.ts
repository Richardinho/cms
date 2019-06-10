import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

export const SHOW_MESSAGE_DURATION = 2000;
export const SERVER_ERROR_MESSAGE = 'a server error occurred';
export const NETWORK_ERROR_MESSAGE = 'a network error occurred';
export const ARTICLE_MISSING_ERROR_MESSAGE = 'article is missing';

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {
  article: Article;
  errorMessage: string;
  showArticleSavedMessage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService) {}
    private articleId;

    private editArticleFormControl: FormControl = new FormControl();

  /*
   *  Fetch article from server
   */

  ngOnInit() {
    this.editArticleFormControl.valueChanges.subscribe(val => {
      this.articleService.hasUnsavedChanges = true;

      this.article.body = val;
    });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.articleId = params.get('id');
        
        return this.articleService.getArticle(this.articleId);
      })).subscribe((article) => {
        this.article = article;

        this.editArticleFormControl.setValue(article.body, { emitEvent: false });
      },
      this.handleError.bind(this));
  }

  /*
   *  When the user clicks the save button, save article to server
   */

  saveEdit() {
    
    this.articleService.updateArticle(this.article)
      .subscribe(
        () => {
          this.articleService.hasUnsavedChanges = false;
          this.showArticleSavedMessage = true;

          setTimeout(() => {
            this.showArticleSavedMessage = false;
          }, SHOW_MESSAGE_DURATION);
        },
        this.handleError.bind(this));
  }

  /*
   *  Error Handling
   *
   *  401: not authenticated. Redirect to Login page
   *  404: Article not found. Show appropriate message. TODO: display link back to home page
   *  500 or any other status code. Probably a server error. Show appropriate message. display link back to home page
   *  non status code. Probably a network error. Ask user to check connection
   *
   *  TODO: retry button
   */

  handleError(error) {
    if (error.status) {
      if (error.status === 401) {
        this.authService.redirectUrl = '/edit-article/' + this.articleId;

        this.router.navigate(['/login']);
      } else if (error.status === 404) {
        this.errorMessage = ARTICLE_MISSING_ERROR_MESSAGE;
      } else {
        this.errorMessage = SERVER_ERROR_MESSAGE;
      }
    } else {
      this.errorMessage = NETWORK_ERROR_MESSAGE;
    }
  }

  /*
   *  returns true when user has unsaved changes
   */

  hasUnsavedChanges() {
    return this.articleService.hasUnsavedChanges;
  }
}
