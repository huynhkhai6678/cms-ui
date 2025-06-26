import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-currency-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './currency-modal.component.html',
  styleUrl: './currency-modal.component.scss'
})
export class CurrencyModalComponent extends BaseComponent implements OnInit {
  override url = 'currencies';
  readonly fb = inject(FormBuilder);
  currencyForm! : FormGroup;

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currency_name: ['', [Validators.required]],
      currency_icon: ['', [Validators.required]],
      currency_code: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    });

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if (response['data']) {
        this.currencyForm.patchValue(response['data']);
      }
    });
  }
}
