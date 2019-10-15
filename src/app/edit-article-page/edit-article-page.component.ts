import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Store, select, createSelector, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';

import { AppState, Article } from '../article';
import { FormArticle } from './utils/form-article.interface';

import { saveArticle } from './actions/save-article.action';
import { articleChanged } from './actions/article-changed.action';
import { articleRequest } from './actions/edit-article-request.action';
import { deleteArticle } from './actions/delete-article.action';

import { selectArticleUnderEdit } from './selectors/article.selector';
import { selectSaving } from './selectors/ui.selector';

import { createArticlePatchData, articleToFormGroup } from './utils/article-form.utils';

import { tagsValidator } from './utils/tags.validator';

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {
  article$: Observable<Article>;
  saving$: Observable<boolean>;
  unsavedChanges: boolean = false;
  articles$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private store: Store<AppState>
  ) {}

  private formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    body: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    tags: new FormArray([
      new FormControl(true),
      new FormControl(true),
      new FormControl(true),
      new FormControl(false),
      ], tagsValidator),
  });

  ngOnInit() {
    this.articles$ = this.store.pipe(select('articles'));
    this.saving$ = this.store.pipe(select(selectSaving));

    this.formGroup.valueChanges.subscribe(formArticle => {
      this.store.dispatch(articleChanged({
        articlePatchData: createArticlePatchData(formArticle, this.articleService.tagData),
      }));
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      this.store.dispatch(articleRequest({
        id,
        redirectUrl: '/edit-article/' + id }));
    });

    this.article$ = this.store.pipe(select(selectArticleUnderEdit));

    this.article$.subscribe(article => {
      if (article) {
        this.formGroup.patchValue(articleToFormGroup(article), { emitEvent: false });
        this.unsavedChanges = !article.saved;
      }
    });
  }

  saveEdit() {
    if (this.formGroup.valid) {
      this.store.dispatch(saveArticle());
    }
  }

  deleteArticle() {
    this.store.dispatch(deleteArticle({ redirectUrl: '/edit-article/'}));
  }

  get enableSaveButton() {
    return this.unsavedChanges && this.formGroup.valid;
  }

  get mytags() :FormArray {
    return this.formGroup.get('tags') as FormArray;
  }
}
