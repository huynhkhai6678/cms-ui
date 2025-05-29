import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { ShareService, SingleSelect2Option } from '../../../services/share.service';
import moment from 'moment';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-patient-modal',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    Select2,
    DateInputComponent,
    PhoneInputComponent,
    ImageUploadComponent
  ],
  templateUrl: './patient-modal.component.html',
  styleUrl: './patient-modal.component.scss'
})
export class PatientModalComponent implements OnInit {
  readonly url = 'patients';
  title = '';
  id = 0;
  avatarUrl = '';
  clinicId = 0;
        
  isSubmitted = false;
  
  patientForm!: FormGroup;
  maxDate = '';
  
  countries : SingleSelect2Option[] = [];
  states : SingleSelect2Option[] = [];
  cities : SingleSelect2Option[] = [];

  races : SingleSelect2Option[]= [];
  religions : SingleSelect2Option[] = [];
  ethnicity : SingleSelect2Option[] = [];
  bloodGroupList : SingleSelect2Option[] = [];
  G6PDList : SingleSelect2Option[] = [];
  doctorList : SingleSelect2Option[] = [];
  maritalStatus : SingleSelect2Option[] = [];
  idTypes : SingleSelect2Option[] = [];

  constructor(
    public bsModalRef: BsModalRef, 
    private fb : FormBuilder, 
    private formService: FormService,
    private locationService: LocationService,
    public homeService: HomeService, 
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.maxDate = moment().format('DD/MM/YYYY');

    // Form initialization
    this.patientForm = this.fb.group({
      clinic_id: [null],
      patient_unique_id: [''],
      patient_mrn: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      full_name: [''],
      gender: [1, Validators.required],
      dob: [null, Validators.required],
      marital_status: [null],
      id_type: [null, Validators.required],
      id_number: [null, Validators.required],
      contact: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nationality: [null, Validators.required],
      race: [null],
      religion: [null],
      ethnicity: [null],
      avatar: [null],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      address1: [''],
      address2: [''],
      country_id: [null],
      state_id: [null],
      city_id: [null],
      postal_code: [''],
      other_contact: [''],
      other_address1: [''],
      other_address2: [''],
      other_country_id: [null],
      blood_group: [null],
      G6PD: [null],
      allergy: [''],
      food_allergy: [''],
      doctor_id: [null],
      important_notes: ['']
    });

    this.religions = this.shareService.RELIGION;
    this.G6PDList = this.shareService.G6PD;
    this.bloodGroupList = this.shareService.BLOOD_GROUP_ARRAY;
    this.races = this.shareService.RACES;
    this.ethnicity = this.shareService.ETHNICITY;
    this.maritalStatus = this.shareService.MARIUS_STATUS;
    this.idTypes = this.shareService.ID_TYPES;

    // Subscribe to the value changes of first_name and last_name
    this.patientForm.get('first_name')?.valueChanges.subscribe(() => {
      this.updateFullName();
    });

    this.patientForm.get('last_name')?.valueChanges.subscribe(() => {
      this.updateFullName();
    });

    if (this.homeService.selectClinics.length > 1) {
      this.patientForm.controls['clinic_id'].setValidators([Validators.required]);
      this.patientForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.patientForm.controls['clinic_id'].setValue(this.clinicId);
    }

    if (this.id) {
      this.patientForm.controls['password'].setValidators([]);
      this.patientForm.controls['confirm_password'].setValidators([]);

      this.patientForm.controls['password'].updateValueAndValidity();
      this.patientForm.controls['confirm_password'].updateValueAndValidity();
    }

    this.formService.getInitData(`${this.url}/${this.id}/${this.clinicId}`).subscribe((response : any) => {
      this.doctorList = response['doctors'];
      this.countries = response['countries'];
      this.states = response['states'];
      this.cities = response['cities'];
      if(response['data']) {
        this.avatarUrl = response['data']['image_url'];
        setTimeout(() => {
          this.patientForm.patchValue(response['data']);
        }, 100);
      }
      this.patientForm.controls['patient_unique_id'].setValue(response['patient_unique_id']);
      this.patientForm.controls['patient_mrn'].setValue(response['patient_mrn']);
    });
  }
  
  submit(valid : any, value : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitFormWithImage(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      }
    })
  }

  updateFullName(): void {
    const firstName = this.patientForm.get('first_name')?.value;
    const lastName = this.patientForm.get('last_name')?.value;
    this.patientForm.get('full_name')?.setValue(`${firstName} ${lastName}`, { emitEvent: false });
  }

  onClinicChange(event : any) {
    this.homeService.getDoctorByClinic(event.value).subscribe((res : any) => {
      this.doctorList = res['data'];
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
