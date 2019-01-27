import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  articles: Array<Article>;

  constructor(
    private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles()
      .subscribe((data: Array<Article>) => {
        this.articles = data;
      });
  }

}
