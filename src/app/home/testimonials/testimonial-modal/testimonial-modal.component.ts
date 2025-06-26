import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { environment } from '../../../../environments/environment';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-testimonial-modal',
  imports: [
    TranslatePipe,
    ImageUploadComponent,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './testimonial-modal.component.html',
  styleUrl: './testimonial-modal.component.scss'
})
export class TestimonialModalComponent extends BaseComponent implements OnInit{
  override url = 'testimonials';
  readonly fb = inject(FormBuilder);
  
  imageUrl = '';
  testimonialForm! : FormGroup;

  ngOnInit(): void {
    this.testimonialForm = this.fb.group({
      clinic_id: [null],
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      short_description: ['', [Validators.required, Validators.max(111)]],
      image: ['', [Validators.required]]
    });

    if (this.homeService.selectClinics.length > 1) {
      this.testimonialForm.controls['clinic_id'].setValidators([Validators.required]);
      this.testimonialForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.clinicId) {
      this.testimonialForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.testimonialForm.patchValue(response['data']);
        this.imageUrl = `${environment.apiUrl}${response['data']['image_url']}`;
      }
    });
  }
}
