import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../../article';

export const selectArticleLinks = (state: AppState) => state.ui.articleLinks;
