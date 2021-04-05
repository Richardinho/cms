import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewArticlePageComponent } from './view-article-page/view-article-page.component';
import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';
import { LoginPageComponent } from './login-page/login-page.component';
// rearrange these imports in a more logical order
import { AuthorisationService } from './services/authorisation.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { MessageService } from './message-service/message.service';
import { MessageWidgetComponent } from './message-widget/message-widget.component';
import { articlesReducer } from './reducers/articles.reducer';
import { uiReducer } from './reducers/ui.reducer';
import { metadataReducer } from './reducers/metadata.reducer';
import { logInReducer } from './reducers/logged-in.reducer';
import { StoreModule } from '@ngrx/store';

import { SpinnerComponent } from './configuration-page/spinner';
import { SaveArticleEffects } from './effects/save-article.effect';
import { LogInEffects } from './effects/login.effect';
import { GetArticleEffects } from './effects/get-article.effect';
import { DeleteArticleEffects } from './effects/delete-article.effect';
import { GetMetadataEffect } from './configuration-page/effects/get-metadata.effect';
import { PutMetadataEffect } from './configuration-page/effects/put-metadata.effect';
import { NavigationEffects } from './view-article-page/effects/navigation.effect';
import { LoadArticleLinksEffects } from './article-page/effects/load-links';
import { PublishEffects } from './article-page/effects/publish';
import { CreateArticleEffects } from './effects/create-article.effect';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { StylesPageComponent } from './styles-page/styles-page.component';

import { MetadataService } from './services/metadata.service';
import {CheckboxComponent} from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlePageComponent,
		IntroPageComponent,
		MenuPageComponent,
    ViewArticlePageComponent,
    EditArticlePageComponent,
    MarkdownToHTMLPipe,
    LoginPageComponent,
    PageNotFoundComponent,
    MessageWidgetComponent,
    ConfigurationPageComponent,
    SpinnerComponent,
    StylesPageComponent,
    CheckboxComponent,
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
      metadata: metadataReducer,
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
      GetMetadataEffect,
      PutMetadataEffect,
    ])
  ],
  providers: [
    AuthorisationService,
    MessageService,
    MetadataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
