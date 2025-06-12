import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { PatientMedicalRecordHistory } from './patient-medical-record-history.model';
import { DatePipe } from '@angular/common';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-patient-medical-record-history',
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './patient-medical-record-history.component.html',
  styleUrl: './patient-medical-record-history.component.scss'
})
export class PatientMedicalRecordHistoryComponent implements OnInit {
  url = 'patient-medical-record/histories';
  data : PatientMedicalRecordHistory[] = [];

  @Input() medicalRecordId = 0;
  @Output() editNote = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private formService : FormService
  ) {}

  ngOnInit() {
    this.apiService.get(`${this.url}/${this.medicalRecordId}`).subscribe((res : any) => {
      this.data = res['data'];
    });
  }

  edit(history : PatientMedicalRecordHistory) {
    return this.editNote.emit(history);
  }

  removeNote(id : number) {
      this.formService.showDeleteConfirm('')
      .subscribe(confirmed => {
        if (confirmed) {
          this.apiService.delete(`patient-medical-record/notes/${id}`).subscribe(() => {
            this.ngOnInit();
          })
        }
      });
    }
}
