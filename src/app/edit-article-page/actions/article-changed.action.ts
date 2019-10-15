import { Article } from '../../model';
import { createAction, props } from '@ngrx/store';

export const articleChanged = createAction(
  '[EditArticle Page] Article Changed',
  props<{ articlePatchData: any }>()
);
