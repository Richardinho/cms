import { createAction, props } from '@ngrx/store';
import { Articles } from '../../model';

export const articleLinksResponse = createAction(
  '[Home Page] Article Links Response',
  props<{ articles: Articles, articleLinks: Array<any> }>()
);
