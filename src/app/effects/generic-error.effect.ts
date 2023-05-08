//  Angular
import { Injectable } from '@angular/core';

//  RXJS
import { tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

//  services
import { MessageService, ERROR } from '../services/message.service';

//  actions
import { genericError } from '../actions/generic-error.action';

@Injectable()
export class GenericErrorEffects {
  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) {}

  genericError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(genericError),
        tap((error) => {
          this.messageService.show(error.message, ERROR);
        })
      );
    },
    { dispatch: false }
  );
}
