import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-slider-modal',
  imports: [
    TranslatePipe,
    ImageUploadComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './slider-modal.component.html',
  styleUrl: './slider-modal.component.scss'
})
export class SliderModalComponent implements OnInit{
  readonly url = 'sliders';
  title = '';
  id = 0;
  clinicId = 0;
  imageUrl = '';

  sliderForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    private apiService : ApiService,
    public homeService : HomeService
  ) {}

  ngOnInit(): void {
    this.sliderForm = this.fb.group({
      clinic_id: [''],
      title: ['', [Validators.required]],
      short_description: ['', [Validators.required]],
      image : ['', [Validators.required]],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.sliderForm.controls['clinic_id'].setValidators([Validators.required]);
      this.sliderForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      this.sliderForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.sliderForm.patchValue(response['data']);
        this.imageUrl = response['data']['image_url'];
      }
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) return;

    this.apiService.postFileWithParams(`${this.url}/${this.id}`, value).subscribe({
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
