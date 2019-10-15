import { Article } from '../../model';
import { createAction, props } from '@ngrx/store';

export const articleFoundInCache = createAction(
  '[EditArticle Page] Article Found In Cache',
  props<{ id: string }>()
);
