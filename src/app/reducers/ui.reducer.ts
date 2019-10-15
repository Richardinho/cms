import { createReducer, on } from '@ngrx/store';
import { UI } from '../article';
import { saveArticle }           from '../edit-article-page/actions/save-article.action';
import { articleSavedResponse }  from '../edit-article-page/actions/article-saved-response.action';
import { articleRequest }        from '../edit-article-page/actions/edit-article-request.action';
import { deleteArticleResponse } from '../edit-article-page/actions/delete-article-response.action';
 
export const initialState :UI = {
  saving: false,
  id_of_article_under_edit: '',
};


/*
 *  set article id when we have navigated to an article or edit page
 */

const articleRequestReducer = (state, action) => ({
  ...state, 
  id_of_article_under_edit: action.id
});

/*
 *  reset article id after deletion
 */

const deleteArticleReducer = (state, action) => ({
  ...state,
  id_of_article_under_edit: '',
});

const _uiReducer = createReducer(initialState,
  on(articleRequest, articleRequestReducer),
  on(deleteArticleResponse, deleteArticleReducer),
  on(saveArticle, state => ({ ...state, saving: true })),
  on(articleSavedResponse, state => ({ ...state, saving: false })),
);
 
export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
