import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewArticlePageComponent } from './view-article-page/view-article-page.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { StylesPageComponent } from './styles-page/styles-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { IntroPageComponent } from './intro-page/intro-page.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPageComponent,
  },
  {
    path: 'home',
    component: MenuPageComponent,
  },
	{
		path: 'intro',
		component: IntroPageComponent,
	},
	{
		path: 'article-list',
		component: ArticlePageComponent,
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
    path: 'metadata',
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
