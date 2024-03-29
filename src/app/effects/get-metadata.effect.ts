import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  concatMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AppState } from '../model';

import {
  unauthorisedResponse,
  metadataRequest,
  metadataResponse,
  genericError,
} from '../actions';

import { MetadataService } from '../services/metadata.service';
import { selectJWTToken } from '../selectors/article.selector';
import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class GetMetadataEffect {
  constructor(
    private actions$: Actions,
    private metadataService: MetadataService,
    private store: Store<AppState>
  ) {}

  getMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(metadataRequest),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(selectJWTToken))))
      ),
      switchMap(([action, token]) => {
        return this.metadataService.getMetadata(token).pipe(
          map((metadata: any) => metadataResponse({ metadata: metadata })),
          catchError((error) => {
            if (error.status) {
              if (error.status === UNAUTHORIZED) {
                return of(unauthorisedResponse({ redirectUrl: '/' }));
              } else {
                return of(genericError({ message: 'Server error occurred' }));
              }
            } else {
              return of(
                genericError({ message: 'some generic error happened' })
              );
            }
          })
        );
      })
    )
  );
}
