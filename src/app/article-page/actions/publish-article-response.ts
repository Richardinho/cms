import { createAction, props } from '@ngrx/store';

export const publishArticleResponse = createAction(
  '[Home Page] Publish Article Response',
  props<{ articleJSON: any }>()
);
