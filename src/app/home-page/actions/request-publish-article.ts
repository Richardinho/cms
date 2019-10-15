import { createAction, props } from '@ngrx/store';

export const requestPublishArticle = createAction(
  '[Home Page] Request Publish Article',
  props<{ id: string, publish: boolean }>()
);
