import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../../article';

export const selectArticles = (state: AppState) => state.articles;

export const selectArticle = createSelector(
  selectArticles,
  (state: Articles, props) => state[props.id] 
);

