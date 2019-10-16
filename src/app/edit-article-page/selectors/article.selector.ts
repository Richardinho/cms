import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../../model';

export const selectArticles = (state: AppState) => state.articles;
export const selectJWTToken = (state: AppState) => state.jwt_token;

export const selectId = (state: AppState) => {
  if (state && state.ui && state.ui.id_of_article_under_edit ) {
    return state.ui.id_of_article_under_edit;
  } else {
    return '';
  }
};

export const selectArticleUnderEdit = createSelector(
  selectArticles,
  selectId,
  (articles: Articles, id: string) => {
     return articles[id];
  }
);

export const selectUnsavedChanges = createSelector(
  selectArticleUnderEdit,
  article => article && !article.saved,
);

/*
 *  article id is not provided as parameter: we need to find that in the store
 */

export const selectArticleUnderEditWithToken = createSelector(
  selectArticles,
  selectId,
  selectJWTToken,
  (articles: Articles, id: string, token: string) => {
    return {
      article: articles[id],
      token,
    };
  }
);

/*
 *  article id is supplied as an argument to this
 */

export const selectArticle = createSelector(
  selectArticles,
  (articles: Articles, props) => articles[props.id]
);


export const selectArticleWithToken = createSelector(
  selectArticle,
  selectJWTToken,
  (article, token) => ({ article, token })
);

