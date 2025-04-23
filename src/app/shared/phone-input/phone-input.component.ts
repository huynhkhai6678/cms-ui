import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-phone-input',
  imports: [
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss'
})
export class PhoneInputComponent implements ControlValueAccessor, Validator, OnInit, AfterViewInit  {

  @Input() selectedContry: any = CountryISO.Malaysia;
  @Input() placeholder: string = 'Enter phone number';

  @ViewChild('wrapper', { static: false }) wrapper!: ElementRef;

  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  phoneControl = new FormControl();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    this.phoneControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngAfterViewInit(): void {
    const input: HTMLInputElement | null = this.wrapper.nativeElement.querySelector('input[type="tel"]');
    if (input) {
      input.addEventListener('blur', () => {
        this.onTouched();
      });
    }
  }


  writeValue(obj: any): void {
    this.phoneControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.phoneControl.disable();
    } else {
      this.phoneControl.enable();
    }
  }

  onBlur() {
    console.log('fddsfdfd');
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // 🧠 Forward validation from internal phoneControl
    return this.phoneControl.errors;
  }
}
