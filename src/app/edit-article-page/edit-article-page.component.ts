import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ArticleService } from '../article.service';

import { AppState, Article } from '../model';

import { articleChanged } from './actions/article-changed.action';
import { articleRequest } from './actions/edit-article-request.action';
import { deleteArticle } from './actions/delete-article.action';
import { saveArticle } from './actions/save-article.action';

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
  // todo: remove: get from store instead
  unsavedChanges = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    // todo: use this variable: e.g. have a spinner
    this.saving$ = this.store.pipe(select(selectSaving));

    /*
     *  Whenever a form input value changes, we update the store
     */

    //  get tag data from somewhere else. e.g the store
    this.formGroup.valueChanges.subscribe(formArticle => {
      this.store.dispatch(articleChanged({

        articlePatchData: createArticlePatchData(formArticle, this.articleService.tagData),
      }));
    });

    /*
     * when parameters change, we make a request for data
     */

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
        //  todo: get this from the store rather than putting on the component
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
    //  todo: get url path from constants file?
    this.store.dispatch(deleteArticle({ redirectUrl: '/edit-article/'}));
  }

  get enableSaveButton() {
    return this.unsavedChanges && this.formGroup.valid;
  }

  get mytags(): FormArray {
    return this.formGroup.get('tags') as FormArray;
  }
}
