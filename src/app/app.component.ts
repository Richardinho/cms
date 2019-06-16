import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ArticleService } from './article.service';
import { MessageService } from './message-service/message.service';

import {
  UNAUTHORIZED,
  NOT_FOUND,
} from './status-code.constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  title = 'cms';

  constructor(
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private messageService: MessageService,
  ) {}

  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }


  createArticle() {

     this.articleService
       .create()
       .subscribe(id => {
         this.router.navigate(['/edit-article', id]);
       }, error => {
         if (error.status) {
           if (error.status === UNAUTHORIZED) {
             this.messageService.show('You are not logged in. Please log in before trying to create an article');
           } else if (error.status === NOT_FOUND) {
             this.messageService.show('Your article has not been created');
           } else {
             this.messageService.show('It\'s not you, it\'s us. Some error occurred on our server');
           }
         } else {
           this.messageService.show('a network error occurred. Please check that you are connected or try again later');
         }
       });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
