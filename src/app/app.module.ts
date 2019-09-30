import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewArticlePageComponent } from './view-article-page/view-article-page.component';
import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './auth/auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { MessageService } from './message-service/message.service';
import { MessageWidgetComponent } from './message-widget/message-widget.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu-service/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ViewArticlePageComponent,
    EditArticlePageComponent,
    MarkdownToHTMLPipe,
    LoginPageComponent,
    PageNotFoundComponent,
    MessageWidgetComponent,
    MenuComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    MessageService,
    MenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
