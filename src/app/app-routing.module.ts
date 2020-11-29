import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewArticlePageComponent } from './view-article-page/view-article-page.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { StylesPageComponent } from './styles-page/styles-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'view-article/:id',
    component: ViewArticlePageComponent,
  },
  {
    path: 'edit-article/:id',
    component: EditArticlePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationPageComponent,
  },
  {
    path: 'styles',
    component: StylesPageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
