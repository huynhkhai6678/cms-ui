import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Select2 } from 'ng-select2-component';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeService } from '../../home.service';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { TimeInputComponent } from '../../../shared/time-input/time-input.component';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { ShareService, SingleSelect2Option } from '../../../services/share.service';
import moment from 'moment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-appointment-modal',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    DateInputComponent,
    TimeInputComponent,
    PhoneInputComponent,
    Select2
  ],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss'
})
export class AppointmentModalComponent implements OnInit {
  url = 'appointments';
  title = '';
  id = 0;
  clinicId = 0;
  startTime = '';
  endTime = '';
  currencyCode = 'RM';

  appointmentForm! : FormGroup;
  isSubmitted = false;

  doctors: SingleSelect2Option[] = [];
  patients: SingleSelect2Option[] = [];
  services: SingleSelect2Option[] = [];
  idTypes : SingleSelect2Option[] = [];
  paymentMethods : SingleSelect2Option[] = [];
  statuses : SingleSelect2Option[] = [];
  paymentStatus : SingleSelect2Option[] = [];

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private formService : FormService,
    private shareService: ShareService,
    public homeService : HomeService,
    private apiService : ApiService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      clinic_id: [null, Validators.required],
      date: ['', Validators.required],
      from_time_value: ['', Validators.required],
      to_time_value: ['', Validators.required],
      patient_id: [null, Validators.required],
      service_id: [null, Validators.required],
      description: [''],
      payment_type: [1],
      payable_amount: [0],
      payment_method: [0],
      status: [1],
      doctor_id: [null],
      dob: [''],
      phone: ['', Validators.required],
      id_type: ['', Validators.required],
      id_number: ['', Validators.required],
      patient_name : [null],
      age: [''],
    });

    this.appointmentForm.controls['dob'].valueChanges.subscribe(dobValue => {
      if (dobValue) {
        const age = this.shareService.calculateAge(dobValue);
        this.appointmentForm.controls['age'].setValue(age);
      } else {
        this.appointmentForm.controls['age'].setValue('');
      }
    });

    if (this.homeService.selectClinics.length > 1) {
      this.appointmentForm.controls['clinic_id'].setValidators([Validators.required]);
      this.appointmentForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.appointmentForm.controls['clinic_id'].setValue(this.clinicId);
    }

    if (this.startTime && this.endTime) {
      this.appointmentForm.controls['date'].setValue(moment(this.startTime).format('DD/MM/YYYY'));
      this.appointmentForm.controls['from_time_value'].setValue(moment(this.startTime).format('hh:mm A'));
      this.appointmentForm.controls['to_time_value'].setValue(moment(this.endTime).format('hh:mm A'));
    }

    this.idTypes = this.shareService.ID_TYPES;
    this.statuses = this.shareService.APPOINTMENT_STATUS_ARRAY;
    this.paymentStatus = this.shareService.PAYMENT_STATUS_ARRAY;
  }

  loadData() {
    this.formService.getInitData(`${this.url}/${this.id}/${this.clinicId}`).subscribe((response : any) => {
      this.doctors = response['doctors'];
      this.patients = response['patients'];
      this.services = response['services'];
      this.paymentMethods = response['payment_methods'];
      if(response['data']) {
        setTimeout(() => {
          this.appointmentForm.patchValue(response['data']);
          this.appointmentForm.controls['age'].setValue(this.shareService.calculateAge(response['data']['dob']));
        }, 100);
      }
    });
  }

  onClinicChange(event : any) {
    this.homeService.getDoctorByClinic(event.value).subscribe((res : any) => {
      this.doctors = res['data'];
    });

    this.homeService.getPatientByClinic(event.value).subscribe((res : any) => {
      this.patients = res['data'];
    });
  }

  onDoctorChange(event : any) {
    this.homeService.getServiceByDoctor(event.value, this.clinicId).subscribe((res : any) => {
      this.services = res['data'];
    });
  }

  onPatientChange(event: any) {
    const option = event.options[0];

    if (option.id_number) {
      this.appointmentForm.patchValue(option);
      this.appointmentForm.controls['id_type'].setValue(parseInt(option.id_type));
      this.appointmentForm.controls['phone'].setValue(option.contact);
      this.appointmentForm.controls['age'].setValue(this.shareService.calculateAge(option.dob));
      this.appointmentForm.controls['patient_name'].setValue(null);
    } else {
      this.appointmentForm.controls['id_number'].setValue('');
      this.appointmentForm.controls['dob'].setValue('');
      this.appointmentForm.controls['id_type'].setValue('');
      this.appointmentForm.controls['phone'].setValue('');
      this.appointmentForm.controls['age'].setValue('');
      this.appointmentForm.controls['patient_name'].setValue(option.value);
    }
  }

  onServiceChange(event: any) {
    const option = event.options[0];
    this.appointmentForm.controls['payable_amount'].setValue(option.charges);
  }

  onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  delete() {
    this.formService.showDeleteConfirm('')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${this.id}`).subscribe(() => {
          this.bsModalRef.hide();
        })
      }
    });
  }
}
