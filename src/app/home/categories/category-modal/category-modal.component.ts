import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-category-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent extends BaseComponent implements OnInit {
  override url = 'categories';
  readonly fb = inject(FormBuilder);

  categoryForm! : FormGroup;

  ngOnInit() {
    this.categoryForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
      is_active: [true],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.categoryForm.controls['clinic_id'].setValidators([Validators.required]);
      this.categoryForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.clinicId) {
      this.categoryForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.categoryForm.patchValue(response['data']);
      }
    });
  }
}
