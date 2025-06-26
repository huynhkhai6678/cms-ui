import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { BaseComponent } from '../../base/base.component';

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
export class ServiceModalComponent extends BaseComponent implements OnInit {
  override url = 'services';
  readonly fb = inject(FormBuilder);

  imageUrl = '';

  categories = [];
  doctors = [];

  serviceForm! : FormGroup;

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
}
