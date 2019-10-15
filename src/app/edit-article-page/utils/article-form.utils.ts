import { FormArticle } from './form-article.interface';
import { Article } from '../../model';

/*
 * functions for working with data relating to the Angular FormGroup in the edit-article component
 */

interface ArticleFormGroup {
  id: string;
  title: string;
  summary: string;
  body: string;
  tags: boolean[];
}

/*
 *  Takes an article from the store and creates from it an object that we can use for creating
 *  an Angular form group
 */

export const articleToFormGroup = (article: Article): ArticleFormGroup => {
  const obj: any = {};

  obj.id = article.id;
  obj.title = article.title;
  obj.summary = article.summary;
  obj.body = article.body;
  obj.tags = article.tags.map(tag => tag.value);

  return obj as ArticleFormGroup;
};

/*
 *  Takes data from a form group and creates an object used for patching an Article.
 *  Note that this isn't the reverse of the above; We can't create an Article object as the previous
 *  transformation removed information
 */

export const createArticlePatchData = (formData, tagData): any => {
  const obj: any = {};

  obj.id = formData.id;
  obj.title = formData.title;
  obj.body = formData.body;
  obj.summary = formData.summary;
  obj.saved = false;
  obj.tags = formData.tags.map((tag, index) => ({ name: tagData[index], value: tag }));

  return obj;
};
