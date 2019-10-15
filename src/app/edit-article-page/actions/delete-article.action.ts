import { createAction, props } from '@ngrx/store';

export const deleteArticle = createAction(
  '[EditArticle Page] Delete Article',
  props<{ redirectUrl: string }>()
);
