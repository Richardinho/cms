import {
  Component,
  Input } from '@angular/core';
import { MenuService } from '../menu-service/menu.service';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import { UNAUTHORIZED, NOT_FOUND } from '../status-code.constants';
import {
  MessageService,
  INFO,
  ERROR,
  WARNING
} from '../message-service/message.service';

// where is the best place for this data? In the store?
export const NOT_LOGGED_IN_MESSAGE = 'You are not logged in. Please log in before trying to create an article';
export const ARTICLE_NOT_CREATED_MESSAGE = 'Your article was not created';
export const SERVER_ERROR_MESSAGE = 'It\'s not you, it\'s use. Somer error occurred on our server';
export const NETWORK_ERROR_MESSAGE = 'a network error occurred. Please check that you are connected or try again later';

@Component({
  selector: 'app-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  constructor(
    private articleService :ArticleService,
    private authService :AuthService,
    private menuService :MenuService,
    private router :Router,
    private messageService :MessageService
  ) {}


  public isLoggedIn: boolean = true;
  
  @Input() 
  public showCreateArticleButton :boolean;


  ngOnInit() {
    // would be better if we just got this from the store (ngrx)
    this.authService.loggedInBus.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  // it's not great that the menu component should be responsible for creating an article.
  // this is where ngrx could be useful: to just dispatch an action here
  createArticle() {

    this.articleService
      .create()
      .subscribe(id => {
        this.router.navigate(['/edit-article', id]);
      }, error => {
        if (error.status) {
          if (error.status === UNAUTHORIZED) {
            this.messageService.show(NOT_LOGGED_IN_MESSAGE, WARNING);
          } else if (error.status === NOT_FOUND) {
            this.messageService.show(ARTICLE_NOT_CREATED_MESSAGE, WARNING);
          } else {
            this.messageService.show(SERVER_ERROR_MESSAGE, ERROR);
          }
        } else {
          this.messageService.show(NETWORK_ERROR_MESSAGE, ERROR);
        }
      });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
