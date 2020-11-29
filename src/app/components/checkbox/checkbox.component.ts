import {
  ElementRef,
  ViewChild,
  Input,
  Component,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'cms-checkbox',
  styleUrls: ['./checkbox.component.scss'],
  template: `

    <label
      class="label"
      [for]="id">{{label}}</label>

    <input
      #input
      [id]="id"
      [formControl]="formControl"

      type="checkbox"/>

    <label
      [for]="id"
      class="box"></label>
    `
    ,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    }
  ],
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input('cbId') id: string;
  @Input() label: string;
  @ViewChild("input", { static: false }) input: ElementRef;

  formControl: FormControl = new FormControl(true);

  disabled = false;

  writeValue(val: any) {
    this.formControl.setValue(val, {emitEvent: false});
  }

  registerOnChange(fn: (val: any) => void) {
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
  }
}


