import { createReducer, on } from '@ngrx/store';
import { articleChanged } from '../edit-article-page/actions/article-changed.action';
 
export const initialState = {
};

const _articlesReducer = createReducer(initialState,
  on(articleChanged, (state, action) => {
    const article = action.article;

    state[article.id] = article;

    return { ...state };
  }),
);
 
export function articlesReducer(state, action) {
  return _articlesReducer(state, action);
}
