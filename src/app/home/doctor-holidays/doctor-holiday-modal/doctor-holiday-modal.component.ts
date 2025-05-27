import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import moment from 'moment';

@Component({
  selector: 'app-doctor-holiday-modal',
  imports: [
    ReactiveFormsModule,
    DateInputComponent,
    Select2,
    TranslatePipe
  ],
  templateUrl: './doctor-holiday-modal.component.html',
  styleUrl: './doctor-holiday-modal.component.scss'
})
export class DoctorHolidayModalComponent implements OnInit {
  readonly url = 'doctor-holidays';
  title = '';
  id = 0;
  clinicId = 0;

  doctors = [];

  hodidayForm! : FormGroup;
  isSubmitted = false;
  minDate = '';

  constructor(public bsModalRef: BsModalRef, private fb : FormBuilder, private formService: FormService, public homeService: HomeService) {}

  ngOnInit(): void {
    this.hodidayForm = this.fb.group({
      clinic_id: [''],
      name: ['', []],
      date: ['', [Validators.required]],
      doctor_id: ['', [Validators.required]],
    });

    this.minDate = moment().format('DD/MM/YYYY');

    if (this.homeService.selectClinics.length > 1) {
      this.hodidayForm.controls['clinic_id'].setValidators([Validators.required]);
      this.hodidayForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.hodidayForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      this.doctors = response['doctors'];
      const data = response['data'];
      if(data) {
        data.date = moment(data.date).format('DD/MM/YYYY');
        setTimeout(() => {
          this.hodidayForm.patchValue(response['data']);
        }, 100);
      }
    });
  }

  submit(value : any, valid : boolean) {
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
