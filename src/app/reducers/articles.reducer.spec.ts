import {
	jsonToArticle,
	deleteArticleResponseReducer
} from './articles.reducer';

import { Article } from '../model';

/*

describe('articles.reducer', () => {
	describe('deleteArticleResponseReducer()', () => {
		it('should..', () => {
			const state = {
				1 : {},
				4 : {},
				10: {},
			};
			const action = {
				id: '4',
			};
			expect(deleteArticleResponseReducer(state, action)).toEqual({
				1 : {},
				10: {},
			});
		});
	});

  describe('jsonToArticle()', () => {
    it('should create an article object from json', () => {
      const json: any = {
        author: 'Richard Hunter',
        body: 'article about tomatoes',
        date_created: 'Aug 01 2019 11:23 PM',
        date_edited: 'Oct 06 2019 07:34 PM',
        id: '46',
        published: false,
        summary: 'I like tomato',
        tag1: 'angular',
        tag2: 'javascript',
        tag3: 'react',
        title: 'Tomato soup',
      };

      const article: Article = jsonToArticle(json);

      expect(article).toEqual({
        title: 'Tomato soup',
        id: '46',
        body: 'article about tomatoes',
        summary: 'I like tomato',
        published: false,
        saved: true,
        tags: [
          { name: 'angular', value: true },
          { name: 'javascript', value: true },
          { name: 'css', value: false },
          { name: 'react', value: true },
          { name: 'html-5', value: false },
        ],
      });
    });
  });
});
*/
