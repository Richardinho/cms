import { createReducer, on } from '@ngrx/store';
import { UI } from '../article';
import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
import { articleRequest } from '../edit-article-page/actions/edit-article-request.action';
import { deleteArticleResponse } from '../edit-article-page/actions/delete-article-response.action';
import { navigateAway } from '../home-page/actions/navigate-away';
import { articleLinksResponse } from '../home-page/actions/article-links-response';
import { publishArticleResponse } from '../home-page/actions/publish-article-response';
import { updateLinks } from './utils';

export const initialState: UI = {
  saving: false,
  id_of_article_under_edit: '',
  articleLinks: [],
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


/*
 *  reset article links when navigating from home page
 */

const navigateAwayFromHomePageReducer = state => ({
  ...state,
  articleLinks: [],
});

const articleLinksResponseReducer = (state, action) => {
  return { ...state, articleLinks: action.articleLinks };
};


/*
 *  update links after publishing/unpublishing an article
 */

const publishArticleResponseReducer = (state, action) => ({
  ...state,
  articleLinks: updateLinks(state.articleLinks, action.articleJSON),
});

const _uiReducer = createReducer(initialState,
  on(articleRequest, articleRequestReducer),
  on(deleteArticleResponse, deleteArticleReducer),
  on(saveArticle, state => ({ ...state, saving: true })),
  on(articleSavedResponse, state => ({ ...state, saving: false })),
  on(navigateAway, navigateAwayFromHomePageReducer),
  on(articleLinksResponse, articleLinksResponseReducer),
  on(publishArticleResponse, publishArticleResponseReducer),
);

export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
