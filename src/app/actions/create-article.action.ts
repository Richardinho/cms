import { createAction, props } from '@ngrx/store';

export const createArticleRequest = createAction(
  '[Create Article] Request',
  props<{ redirectUrl: string }>()
);

export const createArticleResponse = createAction(
  '[Create Article] Response',
  props<{ id: string; }>()
);
