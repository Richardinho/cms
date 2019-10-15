import { createAction, props } from '@ngrx/store';

export const articleLinksResponse = createAction(
  '[Home Page] Article Links Response',
  props<{ articleLinks: Array<any> }>()
);
