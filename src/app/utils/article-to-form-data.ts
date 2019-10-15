import { Article } from '../model';

/*
 *  Takes an article that is stored in our store and converts it to form data that we can send to the server
 */

export const articleToFormData = (article: Article): FormData => {
  const formData = new FormData();

  formData.append('title', article.title);
  formData.append('id', article.id);
  formData.append('body', article.body);
  formData.append('summary', article.summary);
  formData.append('published', article.published.toString());

  const tags = article.tags;

  tags
    .filter(tag => {
      return tag.value;
    })
    .slice(0, 3)
    .forEach((tag, index) => {
      formData.append(`tag${index + 1}`, tag.name);
    });

  return formData;
};
