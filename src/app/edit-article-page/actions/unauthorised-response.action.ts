import { createAction, props } from '@ngrx/store';

export const unauthorisedResponse = createAction(
  '[EditArticle Page] Unauthorised Response',
  props<{ redirectUrl: string }>()
);
