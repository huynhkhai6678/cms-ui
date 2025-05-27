import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { Select2 } from 'ng-select2-component';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";

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
export class DoctorModalComponent implements OnInit {
  readonly url = 'doctors';
  title = '';
  id = 0;
  avatarUrl = '';
  clinicId = 0;

  specializations = [];

  doctorForm! : FormGroup;
  isSubmitted = false;

  constructor(public bsModalRef: BsModalRef, private fb : FormBuilder, private formService: FormService, public homeService: HomeService) {}

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

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitFormWithImage(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      }
    })
  }
}
