import { createAction, props } from '@ngrx/store';

export const deleteArticleResponse = createAction(
  '[EditArticle Page] Delete Article Response',
  props<{ id: string }>()
);
