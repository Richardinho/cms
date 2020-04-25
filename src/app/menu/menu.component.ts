import {
  OnInit,
  Component,
  Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState } from '../model';

import { createArticleRequest } from '../actions/create-article.action';
import { logOut } from '../actions/log-in.action';

@Component({
  selector: 'app-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit() {}

  @Input()
  public showCreateArticleButton: boolean;

  createArticle() {
    this.store.dispatch(createArticleRequest({ redirectUrl: '/' }));
  }

  logOut() {
    this.store.dispatch(logOut());
  }
}
