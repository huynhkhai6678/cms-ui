import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FlatpickrDirective } from 'angularx-flatpickr';
import moment from 'moment';

@Component({
  selector: 'app-time-input',
  imports: [
    FlatpickrDirective,
    TranslatePipe,
    FormsModule
  ],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.scss'
})
export class TimeInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() dateFormat = 'h:i K';
  @Input() momentDateFormat = 'hh:mm A';
  @Input() minuteIncrement = 15;
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

  onValueChange(event: any): void {
    // flatpickr gives a Date
    const formatted = moment(event).format(this.momentDateFormat);
    this.value = formatted;
    this.onChange(formatted);
    this.onTouched();
  }
}
