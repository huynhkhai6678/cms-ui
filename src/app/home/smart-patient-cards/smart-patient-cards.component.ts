import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { SmartPatientCard } from './smart-patient-card.model';
import { SmartPatientCardModalComponent } from './smart-patient-card-modal/smart-patient-card-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-smart-patient-cards',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './smart-patient-cards.component.html',
  styleUrl: './smart-patient-cards.component.scss'
})
export class SmartPatientCardsComponent implements AfterViewInit {
  url = 'smart-patient-cards';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('emailTemplate') emailTemplate!: TemplateRef<any>;
  @ViewChild('phoneTemplate') phoneTemplate!: TemplateRef<any>;
  @ViewChild('dobTemplate') dobTemplate!: TemplateRef<any>;
  @ViewChild('bloodTemplate') bloodTemplate!: TemplateRef<any>;
  @ViewChild('addressTemplate') addressTemplate!: TemplateRef<any>;
  @ViewChild('uniqueTemplate') uniqueTemplate!: TemplateRef<any>;
  @ViewChild('headerColorTemplate') headerColorTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private toastService : ToastrService
  ) {}

  ngAfterViewInit() {
    this.columnCustomTemplates['header_color'] = this.headerColorTemplate;
    this.columnCustomTemplates['show_email'] = this.emailTemplate;
    this.columnCustomTemplates['show_phone'] = this.phoneTemplate;
    this.columnCustomTemplates['show_dob'] = this.dobTemplate;
    this.columnCustomTemplates['show_blood_group'] = this.bloodTemplate;
    this.columnCustomTemplates['show_address'] = this.addressTemplate;
    this.columnCustomTemplates['show_patient_unique_id'] = this.uniqueTemplate;
  }

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['template_name', 'messages.smart_patient_card.templat_name', '', true, 'string'],
    ['header_color', 'messages.smart_patient_card.header_color', '', true, 'template'],
    ['show_email', 'messages.smart_patient_card.email_show', '', true, 'template'],
    ['show_phone', 'messages.smart_patient_card.phone_show', '', true, 'template'],
    ['show_dob', 'messages.smart_patient_card.dob_show', '', true, 'template'],
    ['show_blood_group', 'messages.smart_patient_card.blood_group_show', '', true, 'template'],
    ['show_address', 'messages.smart_patient_card.address_show', '', true, 'template'],
    ['show_patient_unique_id', 'messages.smart_patient_card.unique_id_show', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  delete(data : SmartPatientCard) {
    this.formService.showDeleteConfirm(data?.template_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(SmartPatientCardModalComponent, 'modal-xl', {
      title: 'messages.smart_patient_card.add_smart_card',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(SmartPatientCardModalComponent, 'modal-xl', {
      title: 'messages.smart_patient_card.edit_smart_card',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  activeSmartCard(column :string, target : any, id: number) {
    let value = target.checked;
    if (column === 'header_color') {
      value = target.value;
    } 

    this.apiService.post(`${this.url}/update-entity/${id}`, {
      column,
      value
    }).subscribe((res : any) => {
      this.toastService.success(res['message']);
    });
  }
}
