import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeService } from '../../home.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Select2 } from 'ng-select2-component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-generate-patient-smart-card-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './generate-patient-smart-card-modal.component.html',
  styleUrl: './generate-patient-smart-card-modal.component.scss'
})
export class GeneratePatientSmartCardModalComponent implements OnInit {
  readonly url = 'smart-patient-cards';
  title = '';
  clinicId = 0;
  isSubmitted = false;

  addTemplateForm!: FormGroup;
  templates = [];
  patients = [];

  constructor(
    private fb: FormBuilder,
    private apiService : ApiService,
    public bsModalRef: BsModalRef, 
    public homeService : HomeService
  ) {}

  ngOnInit(): void {
    this.addTemplateForm = this.fb.group({
      template_id: [null, Validators.required],
      clinic_id: [null, Validators.required],
      type: [1, Validators.required],
      patient_id: [null]
    });


    this.addTemplateForm.controls['type'].valueChanges.subscribe(value => {
      console.log(value);
      if (value === 2) {
        this.addTemplateForm.controls['patient_id'].setValidators([Validators.required]);
      } else {
        this.addTemplateForm.controls['patient_id'].setValidators([]);
      }
      this.addTemplateForm.controls['patient_id'].updateValueAndValidity();
    });
    
    if (this.homeService.selectClinics.length > 1) {
      this.addTemplateForm.controls['clinic_id'].setValidators([Validators.required]);
      this.addTemplateForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.addTemplateForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.apiService.get(`${this.url}/generate/${this.clinicId}`).subscribe((response : any) => {
      this.templates = response['templates'];
      this.patients = response['patients'];
    });
  }

  submitForm(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.apiService.post(`${this.url}/generate`, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      }
    })
  }

  onClinicChange(event : any) {
    this.homeService.getPatientByClinic(event.value).subscribe((res : any) => {
      this.patients = res['data'];
    });
    this.apiService.get(`${this.url}/template-by-clinic/${event.value}`).subscribe((res : any) => {
      this.templates = res['data'];
    });
  }
}
