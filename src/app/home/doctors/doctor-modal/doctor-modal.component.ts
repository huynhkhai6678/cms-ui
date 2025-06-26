import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { Select2 } from 'ng-select2-component';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-doctor-modal',
  imports: [
    ReactiveFormsModule,
    PhoneInputComponent,
    DateInputComponent,
    Select2,
    TranslatePipe,
    ImageUploadComponent
],
  templateUrl: './doctor-modal.component.html',
  styleUrl: './doctor-modal.component.scss'
})
export class DoctorModalComponent extends BaseComponent implements OnInit {
  override url = 'doctors';
  readonly fb = inject(FormBuilder);

  avatarUrl = '';
  specializations = [];
  doctorForm! : FormGroup;

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      clinic_ids: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: [1, [Validators.required]],
      status: [1, [Validators.required]],
      specialization_ids: [[], [Validators.required]],
      experience: [''],
      password : [''],
      confirm_password : [''],
      avatar : ['']
    });

    if (this.homeService.selectClinics.length > 1) {
      this.doctorForm.controls['clinic_ids'].setValidators([Validators.required]);
      this.doctorForm.controls['clinic_ids'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.doctorForm.controls['clinic_ids'].setValue([this.clinicId]);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.avatarUrl = response['data']['image_url'];
        this.specializations = response['specializations'];
        this.doctorForm.patchValue(response['data']);
      }
    });
  }
}
