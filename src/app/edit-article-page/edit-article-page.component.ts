import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MessageService } from '../message-service/message.service';
import { DialogService } from '../auth/dialog.service';
import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {}
    private articleId;

    private editArticleBodyFormControl: FormControl = new FormControl();
    private editArticleTitleFormControl: FormControl = new FormControl();
    private editArticleSummaryFormControl: FormControl = new FormControl();


  /*
   *  Fetch article from server
   */

  ngOnInit() {

    this.editArticleBodyFormControl.valueChanges.subscribe(val => {
      this.articleService.hasUnsavedChanges = true;

      this.article.body = val;
    });

    this.editArticleTitleFormControl.valueChanges.subscribe(val => {
      this.articleService.hasUnsavedChanges = true;

      this.article.title = val;
    });

    this.editArticleSummaryFormControl.valueChanges.subscribe(val => {
      this.articleService.hasUnsavedChanges = true;

      this.article.summary = val;
    });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.articleId = params.get('id');
        
        return this.articleService.getArticle(this.articleId);
      })).subscribe((article) => {
        this.article = article;

        this.editArticleBodyFormControl.setValue(article.body, { emitEvent: false });
        this.editArticleSummaryFormControl.setValue(article.summary, { emitEvent: false });
        this.editArticleTitleFormControl.setValue(article.title, { emitEvent: false });
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

          this.messageService.show('article was saved');
        },
        this.handleError.bind(this));
  }

  /*
   *  Delete the article
   */

  delete() {
    const CONFIRMATION_MESSAGE = 'ya sure ya wanna delete?';

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
            .subscribe(
              handleSuccess.bind(this),
              (error) => {
                console.log('an error occurred', error);
              });
        }
      }, () => {
        console.log('an error occurred');
      });
  }

  sendMessage(message) {
    this.messageService.show(message);
  }

  /*
   *  Error Handling
   *
   *  401: not authenticated. Redirect to Login page
   *  404: Article not found. Show appropriate message
   *  500 or any other status code. Probably a server error. Show appropriate message. display link back to home page
   *  non status code. Probably a network error. Ask user to check connection
   */

  handleError(error) {
    if (error.status) {
      if (error.status === UNAUTHORIZED) {

        this.authService.redirectUrl = '/edit-article/' + this.articleId;

        this.router.navigate(['/login']);
      } else if (error.status === NOT_FOUND) {
        this.messageService.show(ARTICLE_MISSING_ERROR_MESSAGE);
      } else {

        this.messageService.show(SERVER_ERROR_MESSAGE);
      }
    } else {
      this.messageService.show(NETWORK_ERROR_MESSAGE);
    }
  }

  get hasUnsavedChanges() {
    return this.articleService.hasUnsavedChanges;
  }
}
