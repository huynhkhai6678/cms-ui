import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    PhoneInputComponent,
    Select2
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent extends BaseComponent implements OnInit {
  override url = 'users';
  readonly fb = inject(FormBuilder);

  userId = 0;
  userForm! : FormGroup;

  chains : any[] = [];
  clinicChains : any[] = [];
  clinics : any[] = [];

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      clinic_chain_id: [''],
      clinic_ids: [[], [Validators.required]],
    });

    this.formService.getInitData(`${this.url}/${this.userId}`).subscribe((response : any) => {
      this.chains = response['clinic_chains'];
      this.clinics = response['clinics'].map((clinic: any) => { return { value : clinic.id, label : clinic.name }});
      this.clinicChains = response['clinic_chains'].map((chain: any) => { return { value : chain.id, label : chain.name }});

      if (this.userId) {
        this.userForm.controls['password'].setValidators([]);
        this.userForm.controls['confirm_password'].setValidators([]);

        this.userForm.controls['password'].updateValueAndValidity();
        this.userForm.controls['confirm_password'].updateValueAndValidity();

        setTimeout(() => {
          // Fix this in future
          // we need to save contry code into db. For now we only have dialcode
          this.userForm.controls['phone'].setValue({
            "number": "4156 297 292",
            "internationalNumber": "+91 4156 297 292",
            "nationalNumber": "04156 297 292",
            "e164Number": "+914156297292",
            "countryCode": "IN",
            "dialCode": "+91"
          });
        }, 100)
      }

      if(response['data']) {
        // Fix this
        setTimeout(() => {
          this.userForm.patchValue(response['data']);
        }, 100)
      }

    });
  }

  onCliniChainChange(event : any) {
    const chain = this.chains.find(chain => { return chain.id === event.value});
    if (chain) {
      const clinicIds = chain.clinics.map((clinic: any) => { return clinic.id });
      this.userForm.controls['clinic_ids'].setValue(clinicIds);
    }
  }
}
