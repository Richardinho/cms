import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

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
  ) {}

  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
