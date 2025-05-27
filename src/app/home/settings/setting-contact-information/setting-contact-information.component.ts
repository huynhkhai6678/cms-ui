import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HomeService } from '../../home.service';
import { Select2 } from 'ng-select2-component';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { City, Country, LocationService, State } from '../../../services/location.service';

@Component({
  selector: 'app-setting-contact-information',
  imports: [
    FormsModule,
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './setting-contact-information.component.html',
  styleUrl: './setting-contact-information.component.scss'
})
export class SettingContactInformationComponent implements OnInit {
  url = 'settings/contact-information';
  clinicId = 0;
  informationForm! : FormGroup;
  isSubmitted = false;

  countries = [];
  states = [];
  cities = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    public homeService : HomeService,
    private locationService : LocationService,
    private toastr : ToastrService,
  ) {
    this.clinicId = this.authService.getUser().clinic_id;
  }

  ngOnInit(): void {
    this.informationForm = this.fb.group({
      address_one: ['', [Validators.required]],
      address_two: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id : [[], [Validators.required]],
      city_id : ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
    });
  }

  loadData() {
    this.apiService.get(`${this.url}/${this.clinicId}`).subscribe((res : any) => {
      const countries = res['countries'] || [];
      this.countries = countries.map((country: Country) => { return { value : country.id, label : country.name }});
      const states = res['states'] || [];
      this.states =  states.map((state: State) => { return { value : state.id, label : state.name }});
      const cities = res['cities'] || [];
      this.cities =  cities.map((city: City) => { return { value : city.id, label : city.name }});

      // Select 2 not working well with form need set timout here
      setTimeout(() => {
        this.informationForm.patchValue(res['data']);
      }, 100)
    });
  }

  submit(value : any, valid: boolean) {
    if(!valid) return;
    this.isSubmitted = true;
    this.apiService.post(`${this.url}/${this.clinicId}`, value).subscribe((res: any) => {
      this.isSubmitted = false;
      this.toastr.success(res['message']);
    });
  }

  onCountryChange(event : any) {
    this.locationService.getStatesByCountry(event.value).subscribe((res : any) => {
      this.states = res['data'];
    });
  }
  
  onStateChange(event : any) {
    this.locationService.getCitiesByState(event.value).subscribe((res : any) => {
      this.cities = res['data'];
    });
  }
}
