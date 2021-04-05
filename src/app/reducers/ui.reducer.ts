import { createReducer, on } from '@ngrx/store';
import { UI } from '../model';
import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
import { articleRequest } from '../edit-article-page/actions/edit-article-request.action';
import { deleteArticleResponse } from '../edit-article-page/actions/delete-article-response.action';
import { navigateAway } from '../article-page/actions/navigate-away';
import { articleLinksResponse } from '../article-page/actions/article-links-response';
import { publishArticleResponse } from '../article-page/actions/publish-article-response';
import { updateLinks } from './utils';
import { updateMetadataRequest, updateMetadataResponse } from '../configuration-page/actions/update-metadata.action';

export const initialState: UI = {
  saving: false,
  id_of_article_under_edit: '',
  articleLinks: [],
  loading: false,
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

// what's the point of this? 
const navigateAwayFromHomePageReducer = state => ({
  ...state,
  articleLinks: [],
});

/*
 *  If we have unsaved changes in our cache for articles, merge these changes into the links brought down from 
 *  the server.
 */

const updateLinksWithLocalData = (articles, links) => {
  return links.map(link => {
    const article = articles[link.id]

    if (article) {
      return { ...link, title: article.title, saved: article.saved };
    }

    return { ...link, saved: true };
  });
};

const articleLinksResponseReducer = (state, action) => {
  return {
    ...state,
    articleLinks: updateLinksWithLocalData(action.articles, action.articleLinks)
  };
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
  on(updateMetadataRequest, state => ({ ...state, loading: true })),
  on(updateMetadataResponse, state => ({ ...state, loading: false })),
);

export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
