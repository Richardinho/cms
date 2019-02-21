import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewArticlePageComponent } from './view-article-page/view-article-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeGuard } from './auth/home.guard';
import { GeneralGuard } from './auth/general.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [HomeGuard],
  },
  {
    path: 'view-article/:id',
    component: ViewArticlePageComponent,
    canActivate: [HomeGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [HomeGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [GeneralGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
