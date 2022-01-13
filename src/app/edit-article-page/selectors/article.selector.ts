import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../../model';

export const selectArticles = (state: AppState) => state.articles;
export const selectJWTToken = (state: AppState) => state.jwt_token;

/*
 * get id of currently edited article
 */
export const selectId = (state: AppState) => {
// todo: use get() from lodash library here
  if (state && state.ui && state.ui.id_of_article_under_edit ) {
    return state.ui.id_of_article_under_edit;
  } else {
    return '';
  }
};

/*
 * get currently edited article
 */
export const selectArticleUnderEdit = createSelector(
  selectArticles,
  selectId,
  (articles: Articles, id: string) => {
     return articles[id];
  }
);

/*
 * get all articles along with JWT token
 */
export const selectArticlesWithJWTToken = createSelector(
  selectJWTToken,
  selectArticles, 
  (token: string, articles: Articles) => ({token, articles})
);

// are there unsaved changes?
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
  (articles: Articles, props: any) => articles[props.id]
);


export const selectArticleWithToken = createSelector(
  selectArticle,
  selectJWTToken,
  (article, token) => ({ article, token })
);

