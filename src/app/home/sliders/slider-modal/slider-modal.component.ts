import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { BaseComponent } from '../../base/base.component';

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
export class SliderModalComponent extends BaseComponent implements OnInit{
  override url = 'sliders';
  readonly fb = inject(FormBuilder);

  imageUrl = '';
  sliderForm! : FormGroup;

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
}
