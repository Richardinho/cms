import { Article } from '../../model';
import { createAction, props } from '@ngrx/store';

export const navigateToEditPageRequest = createAction(
  '[ViewArticle Page] navigate to edit page',
);
