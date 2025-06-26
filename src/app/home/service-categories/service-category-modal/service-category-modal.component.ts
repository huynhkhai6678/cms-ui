import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

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
export class ServiceCategoryModalComponent extends BaseComponent implements OnInit {
  override url = 'service-categories';
  readonly fb = inject(FormBuilder);

  serviceCategoryForm! : FormGroup;

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
}
