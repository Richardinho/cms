import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EditArticlePageComponent,
    MarkdownToHTMLPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
