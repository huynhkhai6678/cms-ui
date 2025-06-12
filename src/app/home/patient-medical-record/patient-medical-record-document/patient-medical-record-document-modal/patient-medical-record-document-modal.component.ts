import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2 } from 'ng-select2-component';
import { FormService } from '../../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { CATEGORIES_TYPE_ARRAY } from '../patient-medical-record-document.constant';
import { SingleSelect2Option } from '../../../../services/share.service';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-patient-medical-record-document-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './patient-medical-record-document-modal.component.html',
  styleUrl: './patient-medical-record-document-modal.component.scss'
})
export class PatientMedicalRecordDocumentModalComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;
  readonly url = 'patient-medical-record-document';

  documentForm!: FormGroup;
  medicalRecordId = 0;
  clinicId = 0;
  id = 0;
  documentPath = '';

  isSubmitted = false;
  categories : SingleSelect2Option[] = [];

  constructor(
    private fb: FormBuilder,
    private formService : FormService,
    private apiService : ApiService,
    private toastr : ToastrService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  loadData() {
    this.apiService.get(`${this.url}/${this.id}`).subscribe((res : any) => {
      this.documentForm.patchValue(res['data']);
    });
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      category_id: ['', Validators.required],
      patient_medical_record_id : ['', Validators.required],
      type : ['', Validators.required],
      path : ['', Validators.required],
      file_name: ['', Validators.required]
    });

    this.documentForm.controls['patient_medical_record_id'].setValue(this.medicalRecordId);
    this.categories = CATEGORIES_TYPE_ARRAY;
  }

  submit(valid : boolean, value : any) {
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
        this.toastr.error(error.error);
      }
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formService.submitFormWithImage(`${this.url}/upload`, 0, {
        file,
        clinic_id: this.clinicId
      }).subscribe({
        next: (res) => {
          this.documentForm.patchValue(res);
          this.isSubmitted = false;
        },
        error: (error) => {
          this.toastr.error(error.error);
        }
      });
    }
  }
}
