import { createReducer, on } from '@ngrx/store';
import { articleChanged }        from '../edit-article-page/actions/article-changed.action';
import { getArticleResponse }    from '../edit-article-page/actions/get-article-response.action';
import { deleteArticleResponse } from '../edit-article-page/actions/delete-article-response.action';
 
import { Article, Articles } from '../article';
import { tagData } from '../article.service';

export const initialState = {
};

export const jsonToArticle = (json: any): Article => {
  const obj: any = {};

  obj.title = json.title;
  obj.id = json.id;
  obj.body = json.body;
  obj.summary = json.summary;
  obj.published = json.published;
  obj.tags = [];

  obj.tags = tagData.map(tag => {
    const name = tag;
    const value = tag === json.tag1
      || tag === json.tag2
      || tag === json.tag3;
  
    return {
      name,
      value
    };
  });

  return obj as Article;
};

export const getArticleResponseReducer = (state, action): Articles => {
  const article: Article = jsonToArticle(action.articleJSON);

  if (article && article.id) {
    state[article.id] = article;

    return { ...state };
  }

  return { ...state };
};

export const articleChangedReducer = (state, action) => {
  const articlePatchData = action.articlePatchData;

  const article = state[articlePatchData.id];

  if (article) {
    state[articlePatchData.id] = { ...article, ...articlePatchData } as Article;

    return { ...state };
  } else {
    return state;
  }
};

export const deleteArticleResponseReducer = (state, action) => {
  console.log(action)
  delete state[action.id]

  return { ...state };
};

const _articlesReducer = createReducer(initialState,
  on(getArticleResponse, getArticleResponseReducer),
  on(articleChanged, articleChangedReducer),
  on(deleteArticleResponse, deleteArticleResponseReducer),
);
 
export function articlesReducer(state, action) {
  return _articlesReducer(state, action);
}
