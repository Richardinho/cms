import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  articles: Array<Article>;
  errorMessage: string;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  publish(article) {
    const articleToPublish = { ...article, published: true };
    const articleId = article.id;

    this.articleService
      .updateArticle(articleToPublish)
      .subscribe((returnedArticle: any) => {
          this.articles = this.articles.map(item => {
            if (item.id === article.id) {
              return returnedArticle;;
            }

            return item;
          });

          if (!returnedArticle.published) {
            alert('article was not published for some reason');
          }
      }, e => {
        if (e.status && e.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Some error occurred';
        }
      });
  }

  unpublish(article) {
    const articleToUnpublish = { ...article, published: false };
    const articleId = article.id;

    this.articleService
      .updateArticle(articleToUnpublish)
      .subscribe((returnedArticle: any) => {
          this.articles = this.articles.map(item => {
            if (item.id === articleId) {
              return returnedArticle;
            }

            return item;
          });

          if (returnedArticle.published) {
            alert('article was not unpublished for some reason');
          }
      }, e => {
        if (e.status && e.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Some error occurred';
        }
      });
  }

  ngOnInit() {
    this.articleService.getArticles()
      .subscribe((data: Array<Article>) => {
        this.articles = data;
      }, (e) => {

        /*
         * If user is forbidden to access this page, then we redirect to login page.
         * Otherwise, we just show a generic error message
         */

        if (e.status && e.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Some error occurred';
        }
      });
  }
}
