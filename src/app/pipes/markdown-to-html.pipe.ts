import { Pipe, PipeTransform } from '@angular/core';
import marked from 'marked';

@Pipe({ name: 'markdownToHTML' })
export class MarkdownToHTMLPipe implements PipeTransform {
  transform(markdown: string): string {
    markdown = markdown || '';
    return marked(markdown);
  }
}
