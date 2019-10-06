import { createReducer, on } from '@ngrx/store';
import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
import { UI } from '../article';
 
export const initialState :UI = {
  saving: false,
};

const _uiReducer = createReducer(initialState,
  on(saveArticle, state => ({ ...state, saving: true })),
  on(articleSavedResponse, state => ({ ...state, saving: false })),
);
 
export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
