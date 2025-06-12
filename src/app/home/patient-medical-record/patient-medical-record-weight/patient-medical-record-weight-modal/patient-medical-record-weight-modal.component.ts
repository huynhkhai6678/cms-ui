import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { DateInputComponent } from '../../../../shared/date-input/date-input.component';

@Component({
  selector: 'app-patient-medical-record-weight-modal',
  imports: [
    ReactiveFormsModule,
    DateInputComponent,
    TranslatePipe,
  ],
  templateUrl: './patient-medical-record-weight-modal.component.html',
  styleUrl: './patient-medical-record-weight-modal.component.scss'
})
export class PatientMedicalRecordWeightModalComponent implements OnInit {
  readonly url = 'medical-record-weight';
  title = '';
  id = 0;
  medicalRecordId = 0;

  weightForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.weightForm = this.fb.group({
      patient_medical_record_id: [''],
      weight: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.weightForm.controls['patient_medical_record_id'].setValue(this.medicalRecordId);

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.weightForm.patchValue(response['data']);
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
