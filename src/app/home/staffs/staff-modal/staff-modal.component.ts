import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';

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
export class StaffModalComponent implements OnInit {
 readonly url = 'staffs';
  title = '';
  id = 0;
  avatarUrl = '';
  clinicId = 0;

  roles = [];

  staffForm! : FormGroup;
  isSubmitted = false;

  constructor(public bsModalRef: BsModalRef, private fb : FormBuilder, private formService: FormService, public homeService: HomeService) {}

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
