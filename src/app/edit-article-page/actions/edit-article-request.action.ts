import { createAction, props } from '@ngrx/store';

export const articleRequest = createAction(
  '[EditArticle Page] Article Request',
  props<{ id: string, redirectUrl: string }>()
);
