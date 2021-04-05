import { Component } from '@angular/core';
import { AppState } from './model';
import { loggedInSelector } from './logged-in.selector';
import { Store, select } from '@ngrx/store';
import { logOut } from './actions/log-in.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms';
  loggedIn$;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(loggedInSelector);
  }

  logOut() {
    this.store.dispatch(logOut());
  }

}
