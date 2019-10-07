import { jsonToArticle } from './articles.reducer';
import { Article } from '../article';

describe('articles.reducer', () => {
  describe('jsonToArticle()', () => {
    it('should create an article object from json', () => {
      const json: any = {
        author: "Richard Hunter",
        body: "article about tomatoes",
        date_created: "Aug 01 2019 11:23 PM",
        date_edited: "Oct 06 2019 07:34 PM",
        id: "46",
        published: false,
        summary: "I like tomato",
        tag1: "angular",
        tag2: "javascript",
        tag3: "react",
        title: "Tomato soup", 
      };

      const article: Article = jsonToArticle(json);

      expect(article).toEqual({
        title: 'Tomato soup',
        id: '46',
        body: 'article about tomatoes',
        summary: 'I like tomato',
        published: false,
        tags: [
          { name: 'angular', value: true },
          { name: 'javascript', value: true },
          { name: 'css', value: false },
          { name: 'react', value: true },
          { name: 'html-5', value: false },
        ],
      });
    })
  });
});
