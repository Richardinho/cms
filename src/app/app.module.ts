import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
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
// rearrange these imports in a more logical order
import { AuthorisationService } from './services/authorisation.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { MessageService } from './message-service/message.service';
import { MessageWidgetComponent } from './message-widget/message-widget.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu-service/menu.service';
import { articlesReducer } from './reducers/articles.reducer';
import { uiReducer } from './reducers/ui.reducer';
import { logInReducer } from './reducers/logged-in.reducer';
import { StoreModule } from '@ngrx/store';

import { SaveArticleEffects } from './effects/save-article.effect';
import { LogInEffects } from './effects/login.effect';
import { GetArticleEffects } from './effects/get-article.effect';
import { DeleteArticleEffects } from './effects/delete-article.effect';
import { NavigationEffects } from './view-article-page/effects/navigation.effect';
import { LoadArticleLinksEffects } from './home-page/effects/load-links';
import { PublishEffects } from './home-page/effects/publish';
import { CreateArticleEffects } from './effects/create-article.effect';

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
    StoreModule.forRoot({
      articles: articlesReducer,
      ui: uiReducer,
      // change name of this reducer
      jwt_token: logInReducer,
    }),
    EffectsModule.forRoot([
      DeleteArticleEffects,
      SaveArticleEffects,
      LogInEffects,
      GetArticleEffects,
      NavigationEffects,
      LoadArticleLinksEffects,
      PublishEffects,
      CreateArticleEffects,
    ])
  ],
  providers: [
    AuthService,
    AuthorisationService,
    MessageService,
    MenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
