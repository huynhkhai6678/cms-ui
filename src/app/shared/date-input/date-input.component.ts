import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FlatpickrDirective } from 'angularx-flatpickr';
import moment from 'moment';

@Component({
  selector: 'app-date-input',
  imports: [
    FlatpickrDirective,
    TranslatePipe,
    FormsModule
  ],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss'
})
export class DateInputComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  @Input() dateFormat = 'd/m/Y';
  @Input() momentDateFormat = 'DD/MM/YYYY';
  @Input() id = '';

  value: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};
  
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors | null {
    return null;
  }

  onValueChange(event: any) {
    const date = moment(event).format(this.momentDateFormat);
    this.value = date;
    this.onChange(date);
    this.onTouched();
  }
}
