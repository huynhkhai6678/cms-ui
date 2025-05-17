import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-currency-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './currency-modal.component.html',
  styleUrl: './currency-modal.component.scss'
})
export class CurrencyModalComponent implements OnInit {
  url = 'currencies';
  title = '';
  id = 0;

  currencyForm! : FormGroup;
  isSubmitted = false;

  constructor(public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
  ) {}

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

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
