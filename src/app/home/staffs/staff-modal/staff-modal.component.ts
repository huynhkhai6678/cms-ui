import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-staff-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2,
    ImageUploadComponent,
    PhoneInputComponent
  ],
  templateUrl: './staff-modal.component.html',
  styleUrl: './staff-modal.component.scss'
})
export class StaffModalComponent extends BaseComponent implements OnInit {
  override url = 'staffs';
  readonly fb = inject(FormBuilder);

  avatarUrl = '';
  roles = [];
  staffForm! : FormGroup;

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      clinic_ids: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      gender: [1, [Validators.required]],
      type: ['', [Validators.required]],
      password : [''],
      confirm_password : [''],
      avatar : ['']
    });

    if (this.homeService.selectClinics.length > 1) {
      this.staffForm.controls['clinic_ids'].setValidators([Validators.required]);
      this.staffForm.controls['clinic_ids'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.staffForm.controls['clinic_ids'].setValue([this.clinicId]);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.avatarUrl = response['data']['image_url'];
        this.roles = response['roles'];
        this.staffForm.patchValue(response['data']);
      }
    });
  }
}
