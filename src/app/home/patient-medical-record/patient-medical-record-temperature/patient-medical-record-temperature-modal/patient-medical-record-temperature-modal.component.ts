import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { DateInputComponent } from '../../../../shared/date-input/date-input.component';

@Component({
  selector: 'app-patient-medical-record-temperature-modal',
  imports: [
    ReactiveFormsModule,
    DateInputComponent,
    TranslatePipe,
  ],
  templateUrl: './patient-medical-record-temperature-modal.component.html',
  styleUrl: './patient-medical-record-temperature-modal.component.scss'
})
export class PatientMedicalRecordTemperatureModalComponent implements OnInit {
  readonly url = 'medical-record-temperature';
  title = '';
  id = 0;
  medicalRecordId = 0;

  bloodPressureForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.bloodPressureForm = this.fb.group({
      patient_medical_record_id: [''],
      temperature: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.bloodPressureForm.controls['patient_medical_record_id'].setValue(this.medicalRecordId);

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.bloodPressureForm.patchValue(response['data']);
      }
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) return;

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastrService.error(error);
      }
    })
  }
}
