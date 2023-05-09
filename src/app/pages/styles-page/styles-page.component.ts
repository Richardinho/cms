import { Component } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './styles-page.component.html',
  styleUrls: ['./styles-page.component.scss'],
})
export class StylesPageComponent {
  blahFormControl: FormControl = new FormControl(false);

  public formGroup: FormGroup = new FormGroup({
    tags: new FormArray([
      new FormControl(true),
      new FormControl(true),
      new FormControl(true),
      new FormControl(false),
    ]),
  });

  get mytags(): FormArray {
    return this.formGroup.get('tags') as FormArray;
  }
}
