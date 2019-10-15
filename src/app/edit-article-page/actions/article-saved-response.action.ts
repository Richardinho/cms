import { Article } from '../../model';
import { createAction, props } from '@ngrx/store';

export const articleSavedResponse = createAction(
  '[EditArticle Page] Article Saved Response',
  props<{ articleJSON: any }>()
);
