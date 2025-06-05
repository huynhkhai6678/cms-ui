import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Select2 } from 'ng-select2-component';
import { MEDICAL_CERTIFICATE_TYPE_ARRAY } from './medical-certificate.constant';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimeInputComponent } from '../../../shared/time-input/time-input.component';
import moment from 'moment';
import { ApiService } from '../../../services/api.service';
import { downloadFile } from '../../../utils/download-file.util';

@Component({
  selector: 'app-medical-certificate',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    BsDatepickerModule,
    TimeInputComponent,
    Select2
  ],
  templateUrl: './medical-certificate.component.html',
  styleUrl: './medical-certificate.component.scss'
})
export class MedicalCertificateComponent implements OnInit {
  readonly url = 'transaction-medical-certificate';
  title = '';
  isSubmitted = false;
  id = 0;
  transactionInvoiceId = 0;

  certificateForm!: FormGroup;

  types = MEDICAL_CERTIFICATE_TYPE_ARRAY;
  doctors = [];

  constructor( 
    private fb: FormBuilder,
    private formService : FormService,
    private apiService: ApiService,
    private toastrService: ToastrService,
    public bsModalRef: BsModalRef, 
  ) {}

  ngOnInit(): void {
    this.certificateForm = this.fb.group({
      transaction_invoice_id : [null],
      range : [''],
      certificate_number: [null],
      doctor_id: [null, [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      type: [0, [Validators.required]],
      end_time : [''],
      start_time: [''],
      reason : [''],
      description : [''],
    });

    const now = new Date();
    this.certificateForm.get('range')?.valueChanges.subscribe((date) => {
      this.certificateForm.get('start_date')?.setValue(date[0].toISOString());
      this.certificateForm.get('end_date')?.setValue(date[1].toISOString());
    });

    // Initial data
    this.certificateForm.get('range')?.setValue([
      now,
      now
    ])

    this.certificateForm.get('start_date')?.setValue(now.toISOString());
    this.certificateForm.get('end_date')?.setValue(now.toISOString());

    this.certificateForm.get('start_time')?.setValue(moment().format('hh:mm A'));
    this.certificateForm.get('end_time')?.setValue(moment().format('hh:mm A'));

    this.loadData();
  }

  loadData() {
    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      this.doctors = response['doctors'];
      if(response['data']) {
        setTimeout(() => {
          this.certificateForm.patchValue(response['data']);
        }, 200)
      }
    });
  }

  onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) return;

    value.transaction_invoice_id = parseInt(value.transaction_invoice_id);
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

  export() {
    this.apiService.downloadFile(`transaction-medical-certificate/export/${this.id}`).subscribe({
      next : (response) => {
        downloadFile(response, 'certificate.pdf');
      },
      error : (error) => {
        this.toastrService.error('Error downloading PDF:', error);
      }
    })
  }
}
