import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { MetadataService } from '../../services/metadata.service';
import { AppState } from '../../model';
import { updateMetadataRequest, updateMetadataResponse } from '../actions/update-metadata.action';
import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { genericError } from '../../edit-article-page/actions/generic-error.action';
import {selectJWTToken} from '../../edit-article-page/selectors/article.selector';
import { UNAUTHORIZED } from '../../status-code.constants';
import { unauthorisedResponse } from '../../edit-article-page/actions/unauthorised-response.action';

@Injectable()
export class PutMetadataEffect {
  constructor(
    private actions$: Actions,
    private metadataService: MetadataService,
    private store: Store<AppState>,
  ) {}

  putMetadata$ = createEffect(() =>  

    this.actions$.pipe(
      ofType(updateMetadataRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {
        return this.metadataService.putMetadata(token, action.metadata).pipe(
          map((metadata: any) => updateMetadataResponse({ metadata })),
          catchError((error) => {
            if (error.status) {
              if (error.status === UNAUTHORIZED) {
                return of(unauthorisedResponse({ redirectUrl: '/' }));
              } else {
                return of(genericError({ message: 'Server error occurred' }));
              }
            } else {
              return of(genericError({ message: 'Server error occurred' }));
            }
          })
        );
      })
    ));
}
