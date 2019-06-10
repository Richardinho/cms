import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { EditArticlePageComponent } from '../edit-article-page/edit-article-page.component';
import { DialogService } from './dialog.service';
import { ArticleService } from '../article.service';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateEditArticleGuard implements CanDeactivate<EditArticlePageComponent>{

  constructor(
    private dialogService: DialogService,
    private articleService: ArticleService) {}

  canDeactivate(): Observable<boolean> | boolean {
    if (this.articleService.hasUnsavedChanges) {
      return this.dialogService.confirm('Discard changes?');
    }

    return true;
  }
}
