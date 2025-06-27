import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-brand-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2,
    PhoneInputComponent
  ],
  templateUrl: './brand-modal.component.html',
  styleUrl: './brand-modal.component.scss'
})
export class BrandModalComponent extends BaseComponent implements OnInit {
  override url = 'brands';
  readonly fb = inject(FormBuilder);

  labelForm! : FormGroup;

  ngOnInit() {
    this.labelForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
      contact: [null],
      email: [''],
      address: [''],
      contact_person: [''],
      payment_terms: [''],
      website: [''],
      comment: [''],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.labelForm.controls['clinic_id'].setValidators([Validators.required]);
      this.labelForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.clinicId) {
      this.labelForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.labelForm.patchValue(response['data']);
      }
    });
  }
}
