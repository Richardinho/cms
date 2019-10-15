import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const DEFAULT_MESSAGE = 'blah blah';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || DEFAULT_MESSAGE);

    return of(confirmation);
  }
}
