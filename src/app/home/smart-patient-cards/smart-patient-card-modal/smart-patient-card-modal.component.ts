import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { HomeService } from '../../home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-smart-patient-card-modal',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './smart-patient-card-modal.component.html',
  styleUrl: './smart-patient-card-modal.component.scss'
})
export class SmartPatientCardModalComponent implements OnInit {
  readonly url = 'smart-patient-cards';
  apiUrl = environment.apiUrl;
  title = '';
  id = 0;

  clinicId = 0;
  clinicName = '';
  addressOne = '';
  logo = '';
        
  isSubmitted = false;
  smartPatientForm!: FormGroup;

  clinics = [];

  columns = [
    { 
      name : 'email',
      label : 'email_show'
    },
    { 
      name : 'phone',
      label : 'phone_show'
    },
    { 
      name : 'dob',
      label : 'dob_show'
    },
    { 
      name : 'blood_group',
      label : 'blood_group_show'
    },
    { 
      name : 'address',
      label : 'address_show'
    },
    { 
      name : 'patient_unique_id',
      label : 'unique_id_show'
    }
  ];

  constructor(
    public bsModalRef: BsModalRef, 
    private fb : FormBuilder, 
    private formService: FormService,
    public homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.smartPatientForm = this.fb.group({
      clinic_id: [null, Validators.required],
      template_name: ['', Validators.required],
      header_color: ['#161e54', Validators.required],
      show_email: [true],
      show_phone: [true],
      show_dob: [true],
      show_blood_group: [true],
      show_address: [true],
      show_patient_unique_id: [true]
    });

    if (this.homeService.selectClinics.length > 1) {
      this.smartPatientForm.controls['clinic_id'].setValidators([Validators.required]);
      this.smartPatientForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.smartPatientForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}/?clinic_id=${this.clinicId}`).subscribe((response : any) => {
      this.addressOne = response['address_one'];
      this.clinicName = response['clinic_name'];
      this.logo = response['logo'];
      if(response['data']) {
        this.smartPatientForm.patchValue(response['data']);
      }
    });
  }

  loadData(target : any) {
    this.formService.getInitData(`${this.url}/${this.id}/?clinic_id=${target.value}`).subscribe((response : any) => {
      this.addressOne = response['address_one'];
      this.clinicName = response['clinic_name'];
      this.logo = response['logo'];
    });
  }

  submitForm(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      }
    })
  }
}
