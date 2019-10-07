import { createAction, props } from '@ngrx/store';

export const genericError = createAction(
  '[EditArticle Page] Generic Error',
  props<{ message: string }>()
);
