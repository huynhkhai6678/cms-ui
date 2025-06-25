import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-clinic-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    PhoneInputComponent,
    Select2
  ],
  templateUrl: './clinic-modal.component.html',
  styleUrl: './clinic-modal.component.scss'
})
export class ClinicModalComponent extends BaseComponent implements OnInit {
  override url = 'clinics';
  clinicId = 0;

  readonly types = [
    { label: 'General Practice', value: 1},
    { label: 'Detal', value: 2},
    { label: 'Specialist', value: 3}
  ]

  clinicForm! : FormGroup;
  readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.clinicForm = this.fb.group({
      name: ['', [Validators.required]],
      landing_name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      phone: [null, [Validators.required]],
      address1: [''],
      country_id: [null],
      address2: [''],
      state_id: [null],
      city_id: [null],
      postal_code: [''],
      email: ['', [Validators.required, Validators.email]],
      social_link: [''],
    });

    this.formService.getInitData(`${this.url}/${this.clinicId}`).subscribe((response : any) => {
      this.countries = response['countries'].map((country: any) => { return { value : country.id, label : country.name }});

      if(response['states']) {
        this.states = response['states'].map((state: any) => { return { value : state.id, label : state.name }});
      }

      if(response['cities']) {
        this.cities = response['cities'].map((city: any) => { return { value : city.id, label : city.name }});
      }

      if(response['clinic']) {
        // Fix this
        setTimeout(() => {
          this.clinicForm.patchValue(response['clinic']);
        }, 100)
      }

    });
  }
}
