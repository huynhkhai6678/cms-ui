import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PatientMedicalRecordDocumentModalComponent } from './patient-medical-record-document-modal/patient-medical-record-document-modal.component';
import { ApiService } from '../../../services/api.service';
import { FormService } from '../../../services/form.service';
import { environment } from '../../../../environments/environment';
import { CATEGORIES_TYPE } from './patient-medical-record-document.constant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-medical-record-document',
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './patient-medical-record-document.component.html',
  styleUrl: './patient-medical-record-document.component.scss'
})
export class PatientMedicalRecordDocumentComponent implements OnInit {
  documents : any[] = [];
  readonly url = 'patient-medical-record-document';
  readonly apiUrl = environment.apiUrl;
  readonly CATEGORIES = CATEGORIES_TYPE;

  @Input() medicalRecordId = 0;
  @Input() clinicId = 0;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  ngOnInit() {
    this.apiService.get(`${this.url}/all/${this.medicalRecordId}`).subscribe((res : any) => {
      this.documents = res['data'];
    });
  }

  delete(data : any) {
    this.formService.showDeleteConfirm('')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.id}`).subscribe(() => {
          this.ngOnInit();
        })
      }
    });
  }
  
  create() {
    this.formService.openEditCreateModal(PatientMedicalRecordDocumentModalComponent, 'modal-md', {
      medicalRecordId : this.medicalRecordId,
      clinicId : this.clinicId
    }, () => {
      this.ngOnInit();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(PatientMedicalRecordDocumentModalComponent, 'modal-md', {
      medicalRecordId : this.medicalRecordId,
      clinicId : this.clinicId,
      id
    }, () => {
      this.ngOnInit();
    });
  }

  openNewTab(path : string) {
    const url = `${this.apiUrl}${path}`;
    window.open(url, '_blank');
  }
}
