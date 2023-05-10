//  RXJS
import { createReducer, on } from '@ngrx/store';

//  models
import { UI } from '../model';

//  actions
import {
  articleRequest,
  articleSavedResponse,
  deleteArticleResponse,
  introChanged,
  introNotSavedToServer,
  introSaved,
  saveArticle,
} from '../actions';

import {
  articleLinksResponse,
  genericError,
  navigateAway,
  saveIntro,
  unauthorisedResponse,
  updateMetadataRequest,
  updateMetadataResponse,
} from '../actions';

import { projectsResponse } from '../actions';

import { updateLinks } from './utils';

export const initialState: UI = {
  id_of_article_under_edit: '',
  articleLinks: [],
  loading: false,
};

const projectsResponseReducer = (state: UI, action: any) => {
  return {
    ...state,
    projects: action.projectsJSON,
  };
};

/*
 *  set article id when we have navigated to an article or edit page
 */

const articleRequestReducer = (state: any, action: any) => ({
  ...state,
  id_of_article_under_edit: action.id,
});

/*
 *  reset article id after deletion
 */

const deleteArticleReducer = (state: any, action: any) => ({
  ...state,
  id_of_article_under_edit: '',
});

/*
 *  reset article links when navigating from home page
 */

// what's the point of this?
const navigateAwayFromHomePageReducer = (state: any) => ({
  ...state,
  articleLinks: [],
});

/*
 *  If we have unsaved changes in our cache for articles, merge these changes into the links brought down from
 *  the server.
 */

const updateLinksWithLocalData = (articles: any, links: any) => {
  return links.map((link: any) => {
    const article = articles[link.id];

    if (article) {
      return { ...link, title: article.title, saved: article.saved };
    }

    return { ...link, saved: true };
  });
};

const articleLinksResponseReducer = (state: any, action: any) => {
  return {
    ...state,
    articleLinks: updateLinksWithLocalData(
      action.articles,
      action.articleLinks
    ),
  };
};

const _uiReducer = createReducer(
  initialState,
  on(articleRequest, articleRequestReducer),
  on(deleteArticleResponse, deleteArticleReducer),
  on(saveArticle, (state) => ({ ...state, loading: true })),
  on(articleSavedResponse, (state) => ({
    ...state,
    loading: false,
  })),
  on(navigateAway, navigateAwayFromHomePageReducer),
  on(articleLinksResponse, articleLinksResponseReducer),
  on(updateMetadataRequest, (state) => ({ ...state, loading: true })),
  on(updateMetadataResponse, (state) => ({ ...state, loading: false })),
  on(saveIntro, (state) => ({ ...state, loading: true })),
  on(introNotSavedToServer, (state) => ({ ...state, loading: false })),
  on(introSaved, (state) => ({ ...state, loading: false })),
  on(genericError, (state) => ({ ...state, loading: false })),
  on(projectsResponse, projectsResponseReducer),
  on(unauthorisedResponse, (state) => ({ ...state, loading: false }))
);

export function uiReducer(state: any, action: any) {
  return _uiReducer(state, action);
}
