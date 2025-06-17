import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { ShareService, SingleSelect2Option } from '../../../services/share.service';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-profile-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    ImageUploadComponent,
    PhoneInputComponent,
    DateInputComponent,
    TranslatePipe,
    Select2
  ],
  providers : [
    ShareService
  ],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss'
})
export class ProfileModalComponent implements OnInit {
  TIMEZONES : SingleSelect2Option[] = [];
  BLOODS : SingleSelect2Option[] = [];
  countries : SingleSelect2Option[] = [];
  states : SingleSelect2Option[] = [];
  cities : SingleSelect2Option[] = [];

  profileForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef,
    private apiService: ApiService,
    private fb: FormBuilder,
    private shareService: ShareService,
    private spinnerService: NgxSpinnerService,
    private locationService : LocationService
  ) {}

  ngOnInit(): void {
    this.TIMEZONES = this.shareService.TIME_ZONES_ARRAY;
    this.BLOODS = this.shareService.BLOOD_GROUP_ARRAY;

    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      time_zone: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      gender: [''],
      dob: [''],
      blood_group: [''],
      address1: [''],
      address2: [''],
      country_id: [0],
      state_id: [0],
      city_id: [0],
      postal_code: [''],
      avatar: [null],
    });

    this.spinnerService.show();
    this.apiService.get('profile').subscribe((res : any) => {
      setTimeout(() => {
        this.profileForm.patchValue(res.data);
      }, 100);
      this.countries = res.countries;
      this.states = res.states;
      this.cities = res.cities;
      this.spinnerService.hide();
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

  submit(valid: boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.apiService.postFileWithParams('profile', value).subscribe(() => {
      this.isSubmitted = false;
      this.bsModalRef.hide();
    });
  }

}
