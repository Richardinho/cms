import { createAction, props } from '@ngrx/store';

export const getArticleResponse = createAction(
  '[EditArticle Page] Get Article Response',
  props<{ articleJSON: any }>()
);
