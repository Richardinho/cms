import { Component } from '@angular/core';
import { AppState } from './model';
import { loggedInSelector } from './logged-in.selector';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms';
  loggedIn$;

  ngOnInit() {
    this.loggedIn$ = this.store.select(loggedInSelector);
  }

  constructor(private store: Store<AppState>) {}
}
