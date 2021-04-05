import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState, Article } from '../model';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  article$: Observable<Article>;

  constructor(
  ) {}

  private formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    body: new FormControl('', Validators.required),
  });

}
