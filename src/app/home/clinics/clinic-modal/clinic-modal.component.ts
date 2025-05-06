import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { Select2 } from 'ng-select2-component';
import { FormService } from '../../../services/form.service';
import { City, LocationService, State } from '../../../services/location.service';

@Component({
  selector: 'app-clinic-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    PhoneInputComponent,
    NgxIntlTelInputModule,
    Select2
  ],
  templateUrl: './clinic-modal.component.html',
  styleUrl: './clinic-modal.component.scss'
})
export class ClinicModalComponent implements OnInit {
  readonly url = 'clinics';
  title = '';
  clinicId = 0;

  readonly types = [
    { label: 'General Practice', value: 1},
    { label: 'Detal', value: 2},
    { label: 'Specialist', value: 3}
  ]

  countries = [];
  states = [];
  cities = [];

  clinicForm! : FormGroup;
  isSubmitted = false;

  constructor(public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private apiService: ApiService,
    private locationService: LocationService,
    private formService : FormService,
  ) {}

  ngOnInit(): void {
    this.clinicForm = this.fb.group({
      name: ['', [Validators.required]],
      landing_name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      phone: [null, [Validators.required]],
      address1: [''],
      country_id: [''],
      address2: [''],
      state_id: [''],
      city_id: [''],
      postal_code: [''],
      email: ['', [Validators.required, Validators.email]],
      social_link: [''],
      avatar : ['']
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

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.apiService.post(this.url, value).subscribe({
      next: () => {
        this.isSubmitted = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onCountryChange(event : any) {
    this.locationService.getStatesByCountry(event.value).subscribe((res : any) => {
      this.states = res['data'].map((state: State) => { return { value : state.id, label : state.name }});
    });
  }

  onStateChange(event : any) {
    this.locationService.getCitiesByState(event.value).subscribe((res : any) => {
      this.cities = res['data'].map((city: City) => { return { value : city.id, label : city.name }});
    });
  }
  
}
