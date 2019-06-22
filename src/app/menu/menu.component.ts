import {
  Component,
  Input } from '@angular/core';
import { MenuService } from '../menu-service/menu.service';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth/auth.service';
import { UNAUTHORIZED, NOT_FOUND } from '../status-code.constants';

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
    private router :Router) {}


  public isLoggedIn: boolean = true;
  
  @Input() 
  public showCreateArticleButton :boolean;


  ngOnInit() {
    this.authService.loggedInBus.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  createArticle() {
    /*
     *  If the user is currently editing an article what do we want to do?o
     *
     *  1. not show the create article button
     *
     */

    this.articleService
      .create()
      .subscribe(id => {
        this.router.navigate(['/edit-article', id]);
      }, error => {
        if (error.status) {
          if (error.status === UNAUTHORIZED) {
            //           this.messageService.show('You are not logged in. Please log in before trying to create an article');
          } else if (error.status === NOT_FOUND) {
            //this.messageService.show('Your article has not been created');
          } else {
            //this.messageService.show('It\'s not you, it\'s us. Some error occurred on our server');
          }
        } else {
          //this.messageService.show('a network error occurred. Please check that you are connected or try again later');
        }
      });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
