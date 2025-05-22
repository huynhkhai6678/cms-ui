import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { Select2 } from 'ng-select2-component';

@Component({
  selector: 'app-service-category-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './service-category-modal.component.html',
  styleUrl: './service-category-modal.component.scss'
})
export class ServiceCategoryModalComponent implements OnInit {
  readonly url = 'service-categories';
  title = '';
  id = 0;
  clinicId = 0;
  serviceCategoryForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    public homeService : HomeService
  ) {}


  ngOnInit(): void {
    this.serviceCategoryForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.serviceCategoryForm.controls['clinic_id'].setValidators([Validators.required]);
      this.serviceCategoryForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      this.serviceCategoryForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.serviceCategoryForm.patchValue(response['data']);
      }
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) return;

    this.formService.submitForm(this.url, this.id, value).subscribe({
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
