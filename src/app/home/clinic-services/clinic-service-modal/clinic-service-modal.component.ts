import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-clinic-service-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './clinic-service-modal.component.html',
  styleUrl: './clinic-service-modal.component.scss'
})
export class ClinicServiceModalComponent extends BaseComponent implements OnInit {
  override url = 'clinic-services';
  readonly CATEGORIES = [
    {value: "1", label: 'General'},
    {value: "2", label: 'Consultation'},
    {value: "3", label: 'Treatment'},
    {value: "4", label: 'Procedure'},
    {value: "5", label: 'Investigation'},
    {value: "6", label: 'Laboratory'},
    {value: "7", label: 'Administrative'}
  ];

  cliniServiceForm! : FormGroup;
  readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.cliniServiceForm = this.fb.group({
      clinic_id: [''],
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      cost: [''],
      description: [''],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.cliniServiceForm.controls['clinic_id'].setValidators([Validators.required]);
      this.cliniServiceForm.controls['clinic_id'].updateValueAndValidity();
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.cliniServiceForm.patchValue(response['data']);
      }
    });
  }
}
