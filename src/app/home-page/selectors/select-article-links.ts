import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../../model';

export const selectArticleLinks = (state: AppState) => state.ui.articleLinks;
