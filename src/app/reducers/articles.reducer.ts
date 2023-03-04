import { createReducer, on } from '@ngrx/store';
import { articleChanged } from '../actions/article-changed.action';
import { articleSavedResponse } from '../actions/article-saved-response.action';
import { deleteArticleResponse } from '../actions/delete-article-response.action';
import { getArticleResponse } from '../actions/get-article-response.action';

import { Article, Articles } from '../model';
import { tagData } from '../services/article.service';

export const initialState = {};

// todo: replace with createArticleFactory(json?: any): Article
export const jsonToArticle = (json: any): Article => {
  const obj: any = {};

  obj.title = json.title;
  obj.id = json.id;
  obj.body = json.body;
  obj.summary = json.summary;
  obj.published = json.published;
  obj.saved = true;
  obj.tags = [];

  obj.tags = tagData.map((tag: any) => {
    const name = tag;
    const value = tag === json.tag1 || tag === json.tag2 || tag === json.tag3;

    return {
      name,
      value,
    };
  });

  return obj as Article;
};

export const getArticleResponseReducer = (
  state: any,
  action: any
): Articles => {
  const article: Article = jsonToArticle(action.articleJSON);

  if (article && article.id) {
    return { ...state, [article.id]: article };
  }

  return { ...state };
};

export const articleChangedReducer = (state: any, action: any) => {
  const articlePatchData = action.articlePatchData;

  const article = state[articlePatchData.id];

  if (article) {
    const updatedArticle: Article = {
      ...article,
      ...articlePatchData,
    } as Article;

    return {
      ...state,
      [articlePatchData.id]: updatedArticle,
    };
  } else {
    return state;
  }
};

/*
 *  deletes article out of cache
 */

export const deleteArticleResponseReducer = (state: any, action: any) => {
  return Object.keys(state).reduce((memo, key) => {
    if (key === action.id) {
      return memo;
    }

    return {
      ...memo,
      [key]: state[key],
    };
  }, {});
};

const _articlesReducer = createReducer(
  initialState,
  on(getArticleResponse, getArticleResponseReducer),
  on(articleChanged, articleChangedReducer),
  on(deleteArticleResponse, deleteArticleResponseReducer),
  on(articleSavedResponse, getArticleResponseReducer)
);

export function articlesReducer(state: any, action: any) {
  return _articlesReducer(state, action);
}
