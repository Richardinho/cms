import { Article } from '../../article';
import { createAction, props } from '@ngrx/store';

export const articleChanged = createAction(
  '[EditArticle Page] Article Changed',
  props<{ article: Article }>()
);
