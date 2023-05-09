/*
 *  This is as the article is stored in the database, and as we receive it from the server
 *  We need to convert it into a different form for display and form controls
 */

interface Tag {
  name: string;
  value: boolean;
}

export interface Article {
  title: string;
  id: string;
  body: string;
  summary: string;
  saved: boolean;
  published: boolean;
  tags: Array<Tag>;
}

export interface Metadata {
  github_url: string;
}

export interface Articles {
  [id: string]: Article;
}

export interface Project {
  id: string;
  title: string;
  href: string;
  tag1: string;
  tag2: string;
  tag3: string;
  underEdit: boolean;
  published: boolean;
}

export interface UI {
  id_of_article_under_edit: string;
  articleLinks: Array<any>;
  loading: boolean;
}

export interface Intro {
  body: string;
  saved: boolean;
}

export interface AppState {
  articles: Articles;
  projects: Array<Project>;
  ui: UI;
  jwt_token: string;
  metadata: Metadata;
  intro: Intro;
}
