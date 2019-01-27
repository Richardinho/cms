import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'edit-article/:id', component: EditArticlePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
