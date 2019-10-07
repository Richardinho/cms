import { articleToFormData } from './article-to-form-data';
import { Article } from '../article';
import { formDataToObj } from './utils';

describe('formDataToObj()', () => {
  it('should convert article to formdata', () => {
    const article: Article = {
      title: 'my title',
      id: '12',
      body: 'test body',
      summary: 'test summary',
      published: false,
      tags: [
        { name: 'angular', value: true },
        { name: 'react', value: true },
        { name: 'html', value: true },
        { name: 'css', value: true },
      ]
    };

    const formData = articleToFormData(article);

    expect(formDataToObj(formData)).toEqual({
      title: 'my title',
      id: '12',
      body: 'test body',
      summary: 'test summary',
      published: 'false',
      tag1: 'angular',
      tag2: 'react',
      tag3: 'html'
    });
  });
});
