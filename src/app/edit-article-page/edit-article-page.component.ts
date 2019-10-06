import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { Router } from '@angular/router';
import { articleChanged } from './actions/article-changed.action';
import { saveArticle } from './actions/save-article.action';
import { Store, select, createSelector, State } from '@ngrx/store';
import { selectArticle } from './selectors/article.selector';
import { selectSaving } from './selectors/ui.selector';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { MessageService } from '../message-service/message.service';
import { DialogService } from '../auth/dialog.service';
import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

export const SERVER_ERROR_MESSAGE = 'a server error occurred';
export const NETWORK_ERROR_MESSAGE = 'a network error occurred';
export const ARTICLE_MISSING_ERROR_MESSAGE = 'article is missing';

const MAX_NUM_TAGS = 3;


@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {
  article: Article;
  article$: Observable<Article>;
  saving$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private store: Store<{articles: any}>
  ) {

    this.saving$ = store.pipe(select(selectSaving));
  }

  private articleId;

  private formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    body: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    tags: new FormArray([], this.tagsValidator),
  });

  /*
   *  Fetch article from server
   */

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(article => {
      this.store.dispatch(articleChanged({ article }));
    });


    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.articleId = '' + params.get('id');

        this.article$ = this.store.pipe(select(selectArticle, { id: this.articleId }));
        return this.articleService.getArticle(this.articleId);
      })).subscribe((article) => {
        this.formGroup.patchValue({
          id: this.articleId,
          body: article.body,
          title: article.title,
          summary: article.summary,
        }, { emitEvent: false });

        const tags = [];

        if (article.tag1) {
          tags.push(article.tag1);
        }

        if (article.tag2) {
          tags.push(article.tag2);
        }

        if (article.tag3) {
          tags.push(article.tag3);
        }

        this.articleService.tagData.forEach(tag => {
          if (tags.includes(tag.toLowerCase())) {
            this.mytags.push(new FormControl(true));
          } else {
            this.mytags.push(new FormControl(false));
          }
        });
      },
      (error) => {
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
      })
  }

  saveEdit() {
    if (this.formGroup.valid) {
      this.store.dispatch(saveArticle({ id: this.articleId }));
    }
  }

  /*
   *  Delete the article
   */

  delete() {
    const CONFIRMATION_MESSAGE = 'ya sure ya wanna delete?';
    

    this.dialogService.confirm(CONFIRMATION_MESSAGE)
      .subscribe((canDelete) => {
        if (canDelete) {
          this.articleService
            .deleteArticle(this.articleId)
            .subscribe(
              () => {
                this.articleService.deleteUnsavedArticle(this.articleId);

                this.router.navigate(['/home']);
              },
              (error) => {
                console.log('an error occurred', error);
              });
        }
      }, () => {
        console.log('an error occurred');
      });
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

  sendMessage(message) {
    this.messageService.show(message);
  }

  get enableSaveButton() {
    //return this.formGroup.dirty || this.articleService.hasUnsavedChanges(this.articleId);
    return this.formGroup.dirty;
  }

  get mytags() :FormArray {
    return this.formGroup.get('tags') as FormArray;
  }

  tagsValidator(control) {
    const numberSelected = control
      .controls
      .filter(ctrl => ctrl.value)
      .length; 

    if (numberSelected > MAX_NUM_TAGS) {
      return {
        error: "not allowed more than 3 selected"
      };
    }

    return null;
  }
}
