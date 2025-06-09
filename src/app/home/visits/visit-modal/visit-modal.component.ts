import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareService, SingleSelect2Option } from '../../../services/share.service';
import { Select2 } from 'ng-select2-component';
import { HomeService } from '../../home.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visit-modal',
  imports: [
    ReactiveFormsModule,
    Select2,
    TranslatePipe,
    PhoneInputComponent,
    DateInputComponent,
  ],
  templateUrl: './visit-modal.component.html',
  styleUrl: './visit-modal.component.scss'
})
export class VisitModalComponent implements OnInit {
  visitForm!: FormGroup;
  title = '';
  id = 0;
  clinicId = 0;

  readonly url = 'visits';
  isSubmitted = false;

  clinics : SingleSelect2Option[] = [];
  doctors : SingleSelect2Option[] = []; 
  patients : SingleSelect2Option[] = [];
  idTypes : SingleSelect2Option[] = [];
  visitTypes : SingleSelect2Option[] = [];

  constructor(private fb: FormBuilder, public homeService: HomeService, public bsModalRef: BsModalRef, private shareService : ShareService, private formService : FormService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData()
  }

  initForm(): void {
    this.visitForm = this.fb.group({
      doctor_id: [null, Validators.required],
      clinic_id: [null, Validators.required],
      visit_date: [null, Validators.required],
      visit_type: [null, Validators.required],
      patient_id: [null, Validators.required],
      id_type: [null, Validators.required],
      id_number: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      age: [''],
      description: [''],
      important_notes: [''],
      patient_name: ['']
    });

    this.visitForm.controls['dob'].valueChanges.subscribe(dobValue => {
      if (dobValue) {
        const age = this.shareService.calculateAge(dobValue);
        this.visitForm.controls['age'].setValue(age);
      } else {
        this.visitForm.controls['age'].setValue('');
      }
    });

    if (this.homeService.selectClinics.length > 1) {
      this.visitForm.controls['clinic_id'].setValidators([Validators.required]);
      this.visitForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (this.clinicId) {
      this.visitForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.idTypes = this.shareService.ID_TYPES;
    this.visitTypes = this.shareService.VISIT_STATUS_ARRAY;
  }

  loadData() {
    this.formService.getInitData(`${this.url}/${this.id}/${this.clinicId}`).subscribe((response : any) => {
      this.doctors = response['doctors'];
      this.patients = response['patients'];
      if(response['data']) {
        setTimeout(() => {
          this.visitForm.patchValue(response['data']);
          this.visitForm.controls['age'].setValue(this.shareService.calculateAge(response['data']['dob']));
        }, 100);
      }
    });
  }


  submitForm(valid : boolean, value : any)  {
    this.isSubmitted = true;
    this.formService.checkInvalidFields(this.visitForm);
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
        this.toastrService.error(error.error.message);
      }
    })
  }

  cancel(): void {
    // Navigate back or reset
  }

  onClinicChange(event : any) {
    this.homeService.getDoctorByClinic(event.value).subscribe((res : any) => {
      this.doctors = res['data'];
    });

    this.homeService.getPatientByClinic(event.value).subscribe((res : any) => {
      this.patients = res['data'];
    });
  }

  onPatientChange(event: any) {
    const option = event.options[0];
    if (option.id_number) {
      this.visitForm.patchValue(option);
      this.visitForm.controls['id_type'].setValue(parseInt(option.id_type));
       this.visitForm.controls['id_number'].setValue(option.id_number);
      this.visitForm.controls['phone'].setValue(option.contact);
      this.visitForm.controls['age'].setValue(this.shareService.calculateAge(option.dob));
      this.visitForm.controls['patient_name'].setValue(null);
    } else {
      this.visitForm.controls['id_number'].setValue('');
      this.visitForm.controls['dob'].setValue('');
      this.visitForm.controls['id_type'].setValue('');
      this.visitForm.controls['phone'].setValue('');
      this.visitForm.controls['age'].setValue('');
      this.visitForm.controls['patient_name'].setValue(option.value);
    }
  }
}
