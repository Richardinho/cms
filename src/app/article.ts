/*
 *  This is as the article is stored in the database, and as we receive it from the server
 *  We need to convert it into a different form for display and form controls
 */

export interface Article {
  title: string;
  id: string;
  body: string;
  summary: string;
  saved: boolean;
  published: boolean;
  tags: Array<{ name: string; value: boolean}>
}

export interface Articles {
  [id:string]: Article; 
}

export interface UI {
  saving: boolean;
  id_of_article_under_edit: string;
  articleLinks: Array<any>;
}

export interface AppState {
  articles: Articles;
  ui: UI;
}

