import { createAction, props } from '@ngrx/store';

export const editArticleRequest = createAction(
  '[EditArticle Page] Edit Article Request',
  props<{ id: string }>()
);
