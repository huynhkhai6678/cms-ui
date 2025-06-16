import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { VisitModalComponent } from './visit-modal/visit-modal.component';
import { ShareService } from '../../services/share.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visits',
  imports: [
    DataTableComponent,
    TranslatePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.scss'
})
export class VisitsComponent implements AfterViewInit {
  url = 'visits';
  columnCustomTemplates : Record<string, any> = {};
  apiUrl = environment.apiUrl;

  readonly VISIT_TYPE : Record<string, any> = {
    1: 'Pending',
    2: 'Appointment',
    3: 'OTC',
    4: 'Video Call'
  }

  @ViewChild('patientNameTemplate') patientNameTemplate!: TemplateRef<any>;
  @ViewChild('doctorNameTemplate') doctorNameTemplate!: TemplateRef<any>;
  @ViewChild('profileTemplate') profileTemplate!: TemplateRef<any>;
  @ViewChild('apptTemplate') apptTemplate!: TemplateRef<any>;
  @ViewChild('typeTemplate') typeTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private router : Router,
    private apiService: ApiService,
    private formService: FormService,
    public shareService: ShareService,
    private toastService: ToastrService
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['row_index', 'messages.visit.no', '', true, 'string'],
    ['visit_date', 'messages.visit.visit_date', '', true, 'template'],
    ['visit_type', 'messages.visit.visit_type', '', false, 'template'],
    ['appointment_date', 'messages.visit.appointment_time', '', false, 'template'],
    ['patient_full_name', 'messages.visit.patient', '', true, 'template'],
    ['user_profile', 'messages.patient.profile', '', true, 'template'],
    ['doctor_full_name', 'messages.visit.doctor', '', true, 'template'],
    ['visit_description', 'messages.visit.description', '', false, 'string'],
    ['visit_important_notes', 'messages.visit.important_notes', '', false, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
    ['visit_status', 'messages.common.status', '', false, 'template'],
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['patient_full_name'] = this.patientNameTemplate;
    this.columnCustomTemplates['doctor_full_name'] = this.doctorNameTemplate;
    this.columnCustomTemplates['user_profile'] = this.profileTemplate;
    this.columnCustomTemplates['visit_type'] = this.typeTemplate;
    this.columnCustomTemplates['appointment_date'] = this.apptTemplate;
    this.columnCustomTemplates['visit_date'] = this.dateTemplate;
    this.columnCustomTemplates['visit_status'] = this.statusTemplate;
   
    this.dataTableComponent.setDateFilter('today');
  }

  delete(data : any) {
    this.formService.showDeleteConfirm(data?.full_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.patient_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(VisitModalComponent, 'modal-xl', {
      title: 'messages.visit.add_visit',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(VisitModalComponent, 'modal-xl', {
      title: 'messages.visit.edit_visit',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  openMedicalRecord(item : any) {
    return this.router.navigate([`/home/patient-medical-record/${item.medical_record_id}`]);
  }

  openTransaction(item: any) {
    if (!item.transaction_invoice_id) {
      return this.router.navigate([`/home/transactions/create/0`], { queryParams: {clinicId: item.visit_clinic_id, visitId: item.visit_id}});
    }
    return this.router.navigate([`/home/transactions/create/${item.transaction_invoice_id}`]);
  }

  openCetificate(item: any) {
    if (item.certificate_id) {
      return;
    }

    // Open cetificate id

  }

  updateVisitStatus(id : number, event : any){

    this.apiService.post(`${this.url}/update-status/${id}`, {
      status : event.target.value
    }).subscribe((res : any) => {
      this.toastService.success(res['message']);
    });
  }
}
