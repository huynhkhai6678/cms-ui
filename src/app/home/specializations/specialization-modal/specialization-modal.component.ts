import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-specialization-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './specialization-modal.component.html',
  styleUrl: './specialization-modal.component.scss'
})
export class SpecializationModalComponent extends BaseComponent implements OnInit {
  override url = 'specializations';
  readonly fb = inject(FormBuilder);

  specializationForm! : FormGroup;

  ngOnInit(): void {
    this.specializationForm = this.fb.group({
      name: ['', [Validators.required]],
      clinic_id : ['']
    });

    if (this.homeService.selectClinics.length > 1) {
      this.specializationForm.controls['clinic_id'].setValidators([Validators.required]);
      this.specializationForm.controls['clinic_id'].updateValueAndValidity();
    } 

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.specializationForm.patchValue(response['data']);
      }
    });
  }
}
