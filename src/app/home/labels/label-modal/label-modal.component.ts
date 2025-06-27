import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { LABEL_TYPE_ARRAY } from '../label.contant';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-label-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2 
  ],
  templateUrl: './label-modal.component.html',
  styleUrl: './label-modal.component.scss'
})
export class LabelModalComponent extends BaseComponent implements OnInit{
  override url = 'labels';
  readonly types = LABEL_TYPE_ARRAY;
  readonly fb = inject(FormBuilder);

  labelForm! : FormGroup;

  ngOnInit() {
    this.labelForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
      type: [0, [Validators.required]],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.labelForm.controls['clinic_id'].setValidators([Validators.required]);
      this.labelForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.clinicId) {
      this.labelForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.labelForm.patchValue(response['data']);
      }
    });
  }
}
