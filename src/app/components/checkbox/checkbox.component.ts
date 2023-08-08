import { ElementRef, ViewChild, Input, Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-cms-checkbox',
  styleUrls: ['./checkbox.component.scss'],
  template: `
    <label class="label" [for]="_id">{{ label }}</label>

    <input
      #input
      [id]="_id"
      [formControl]="formControl"
      type="checkbox" />

    <label [for]="_id" class="box"></label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id: string | number;
  @Input() label: string;
  @ViewChild('input', { static: false }) input: ElementRef;

  get _id() {

    return '__' + this.id + '__';
  }

  formControl: FormControl = new FormControl(true);

  disabled = false;

  writeValue(val: any) {
    this.formControl.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: (val: any) => void) {
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {}
}
