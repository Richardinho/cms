//  Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// RXJS
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

// models
import { Article } from '../../model';
import { AppState } from '../../model';

// selectors
import { introSavedChanges, selectIntro } from '../../selectors/intro.selector';
import { selectShowLoader } from '../../selectors/show-loader.selector';

// actions
import { introChanged } from '../../actions/intro-changed.action';
import { introRequest } from '../../actions/intro-request.action';
import { saveIntro } from '../../actions/save-intro.action';

@Component({
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  intro$: Observable<any>;
  showLoader$: Observable<boolean>;
  disableSaveButton$: Observable<boolean>;

  fGroup: FormGroup = new FormGroup({
    body: new FormControl('', Validators.required),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showLoader$ = this.store.pipe(select(selectShowLoader));

    const savedChanges$: Observable<boolean> = this.store.pipe(
      select(introSavedChanges)
    );

    this.disableSaveButton$ = combineLatest(
      savedChanges$,
      this.fGroup.statusChanges
    ).pipe(
      map(([savedChanges, status]) => {
        return savedChanges || status === 'INVALID';
      })
    );

    //  when form changes, update store (note: updating the server is a different action).
    this.fGroup.valueChanges.subscribe((fg) => {
      const metadata = { ...fg, saved: false };
      this.store.dispatch(introChanged(metadata));
    });

    //  when intro in store is updated, update form
    this.intro$ = this.store.pipe(select(selectIntro));
    this.intro$.subscribe((intro) => {
      if (intro) {
        this.fGroup.patchValue(intro, { emitEvent: false });
      }
    });

    //  dispatch action to request intro data from server
    this.store.dispatch(introRequest());
  }

  saveEdit() {
    if (this.fGroup.valid) {
      this.store.dispatch(saveIntro());
    }
  }
}
