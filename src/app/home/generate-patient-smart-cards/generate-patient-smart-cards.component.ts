import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { GeneratePatientSmartCardModalComponent } from './generate-patient-smart-card-modal/generate-patient-smart-card-modal.component';
import { CardReviewModalComponent } from './card-review-modal/card-review-modal.component';
import { downloadFile } from '../../utils/download-file.util';

@Component({
  selector: 'app-generate-patient-smart-cards',
  imports: [
    DataTableComponent,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './generate-patient-smart-cards.component.html',
  styleUrl: './generate-patient-smart-cards.component.scss'
})
export class GeneratePatientSmartCardsComponent implements AfterViewInit {
  url = 'smart-patient-cards/patient-card';
  columnCustomTemplates : Record<string, any> = {};
  apiUrl = environment.apiUrl;

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  ngAfterViewInit() {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
  }

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.smart_patient_card.templat_name', '', true, 'template'],
    ['patient_unique_id', 'messages.smart_patient_card.header_color', '', true, 'string'],
    ['template_name', 'messages.smart_patient_card.templat_name', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  delete(data : any) {
    this.formService.showDeleteConfirm(data?.template_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.patient_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(GeneratePatientSmartCardModalComponent, 'modal-lg', {
      title: 'messages.smart_patient_card.generate_patient_card',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  view(id: number) {
    this.formService.openEditCreateModal(CardReviewModalComponent, 'modal-lg', {
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  download(id: number) {
    this.apiService.downloadFile(`smart-patient-cards/export/${id}`).subscribe({
      next : (response) => {
        downloadFile(response, 'SmartPatientCard.pdf');
      },
      error : (error) => {
        console.error('Error downloading PDF:', error);
      }
    })
  }
}
