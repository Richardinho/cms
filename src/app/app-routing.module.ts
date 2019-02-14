import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginGuard } from './auth/login.guard';
import { HomeGuard } from './auth/home.guard';
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
    path: 'edit-article/:id',
    component: EditArticlePageComponent,
    canActivate: [HomeGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [HomeGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
