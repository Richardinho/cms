import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { StylesPageComponent } from './pages/styles-page/styles-page.component';
import { ViewArticlePageComponent } from './pages/view-article-page/view-article-page.component';

import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';
import { AuthorisationService } from './services/authorisation.service';
import { MessageService } from './services/message.service';

import { MessageWidgetComponent } from './components/message-widget/message-widget.component';
import { ProjectEditFormComponent } from './components/project-edit-form/project-edit-form.component';
import { articlesReducer } from './reducers/articles.reducer';
import { introReducer } from './reducers/intro.reducer';
import { uiReducer } from './reducers/ui.reducer';
import { logInReducer } from './reducers/logged-in.reducer';
import { metadataReducer } from './reducers/metadata.reducer';
import { projectsReducer } from './reducers/projects.reducer';

// add this to styles page
import { SpinnerComponent } from './pages/configuration-page/spinner';

import { NavigationEffects } from './effects/navigation.effect';
import { DeleteArticleEffects } from './effects/delete-article.effect';
import { CreateArticleEffects } from './effects/create-article.effect';
import { MetadataService } from './services/metadata.service';
import { GetMetadataEffect } from './effects/get-metadata.effect';
import { PutMetadataEffect } from './effects/put-metadata.effect';
import { SaveArticleEffects } from './effects/save-article.effect';
import { GetArticleEffects } from './effects/get-article.effect';
import { LogInEffects } from './effects/login.effect';
import { GetIntroEffects } from './effects/intro.effect';
import { LoadArticleLinksEffects } from './effects/load-links';
import { ProjectsEffects } from './effects/projects.effect';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    IntroPageComponent,
    ProjectEditFormComponent,
    MenuPageComponent,
    PageNotFoundComponent,
    ProjectsPageComponent,
    AppComponent,
    ArticlePageComponent,
    CheckboxComponent,
    ConfigurationPageComponent,
    EditArticlePageComponent,
    LoginPageComponent,
    MarkdownToHTMLPipe,
    MessageWidgetComponent,
    SpinnerComponent,
    StylesPageComponent,
    ViewArticlePageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      articles: articlesReducer,
      intro: introReducer,
      ui: uiReducer,
      // change name of this reducer
      jwt_token: logInReducer,
      metadata: metadataReducer,
      projects: projectsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([
      DeleteArticleEffects,
      SaveArticleEffects,
      LogInEffects,
      GetIntroEffects,
      GetArticleEffects,
      NavigationEffects,
      LoadArticleLinksEffects,
      CreateArticleEffects,
      GetMetadataEffect,
      PutMetadataEffect,
    ]),
  ],
  providers: [AuthorisationService, MessageService, MetadataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
