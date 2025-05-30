import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';

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
export class BrandModalComponent implements OnInit {
  readonly url = 'brands';
  title = '';
  id = 0;
  clinicId = 0;

  labelForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    public homeService : HomeService,
    private toastrService: ToastrService
  ) {}

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

    if (!this.id) {
      this.labelForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.labelForm.patchValue(response['data']);
      }
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) return;

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastrService.error(error);
      }
    })
  }
}
