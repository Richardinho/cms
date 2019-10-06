export interface Article {
  title: string;
  id: string;
  body: string;
  summary: string;
  tags: string[];
}

export interface Articles {
  [id:string]: Article; 
}

export interface UI {
  saving: boolean;
}

export interface AppState {
  articles: Articles;
  ui: UI;
}

