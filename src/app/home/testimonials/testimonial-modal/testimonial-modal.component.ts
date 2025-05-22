import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { environment } from '../../../../environments/environment';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { ApiService } from '../../../services/api.service';

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
export class TestimonialModalComponent implements OnInit{
  readonly url = 'testimonials';
  title = '';
  imageUrl = '';
  id = 0;
  clinicId = 0;

  testimonialForm! : FormGroup;
  isSubmitted = false;

   constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private apiService: ApiService,
    private formService: FormService,
    public homeService : HomeService
  ) {}

  ngOnInit(): void {
    this.testimonialForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      short_description: ['', [Validators.required, Validators.max(111)]],
      image: ['', [Validators.required]]
    });

    if (this.homeService.selectClinics.length > 1) {
      this.testimonialForm.controls['clinic_id'].setValidators([Validators.required]);
      this.testimonialForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      this.testimonialForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.apiService.get(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.testimonialForm.patchValue(response['data']);
        this.imageUrl = `${environment.apiUrl}${response['data']['image_url']}`;
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
