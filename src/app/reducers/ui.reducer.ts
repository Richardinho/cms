import { createReducer, on } from '@ngrx/store';
import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
import { UI } from '../article';
import { getArticleResponse } from '../edit-article-page/actions/get-article-response.action';
 
export const initialState :UI = {
  saving: false,
  id_of_article_under_edit: '',
};

const getArticleResponseReducer = (state, action) => {
  return {
    ...state,
    id_of_article_under_edit: action.articleJSON.id
  }
};

const _uiReducer = createReducer(initialState,
  on(getArticleResponse, getArticleResponseReducer),
  on(saveArticle, state => ({ ...state, saving: true })),
  on(articleSavedResponse, state => ({ ...state, saving: false })),
);
 
export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
