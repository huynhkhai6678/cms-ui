import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';

@Component({
  selector: 'app-service-modal',
  imports: [
    TranslatePipe,
    ImageUploadComponent,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent implements OnInit {
  readonly url = 'services';
  title = '';
  id = 0;
  clinicId = 0;
  imageUrl = '';

  categories = [];
  doctors = [];

  serviceForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    public homeService : HomeService
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
      short_description: ['', [Validators.required]],
      status: [true, [Validators.required]],
      category_id: ['', [Validators.required]],
      doctor_ids: [[], [Validators.required]],
      logo  : ['', [Validators.required]],
      charges: ['', [Validators.required]]
    });

    if (this.homeService.selectClinics.length > 1) {
      this.serviceForm.controls['clinic_id'].setValidators([Validators.required]);
      this.serviceForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      this.serviceForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      this.categories = response['categories'];
      this.doctors = response['doctors'];
      if(response['data']) {
        setTimeout(() => {
          this.serviceForm.patchValue(response['data']);
          this.imageUrl = response['data']['image_url'];
        }, 100)
      }
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) return;

    this.formService.submitFormWithImage(this.url, this.id, value).subscribe({
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
