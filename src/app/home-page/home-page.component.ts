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
