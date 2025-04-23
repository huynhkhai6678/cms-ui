import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { ShareService } from '../../../services/share.service';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    ImageUploadComponent,
    PhoneInputComponent,
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
  TIMEZONES : { label : string; value: number}[] = [];
  BLOODS : { label : string; value: number}[] = [];
  countries : { label : string; value: number}[] = [];
  states : { label : string; value: number}[] = [];
  cities : { label : string; value: number}[] = [];

  profileForm! : FormGroup;
  isSubmitted : boolean = false;


  constructor(public bsModalRef: BsModalRef, private apiService: ApiService, private fb: FormBuilder, private shareService: ShareService, private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.TIMEZONES = this.shareService.TIME_ZONES_ARRAY;
    this.BLOODS = this.shareService.BLOOD_GROUP_ARRAY;

    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      time_zone: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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
      this.profileForm.patchValue(res.data);
      this.countries = res.countries;
      this.states = res.states;
      this.cities = res.cities;
      this.spinnerService.hide();
    });
  }


  submit(valid: boolean, value : any) {
    if (valid) {
      return;
    }

    this.apiService.postFileWithParams('profile', value).subscribe(res => {
      console.log(res);
    });
  }

}
