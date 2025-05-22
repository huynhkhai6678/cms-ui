import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { Faq } from './faq.model';
import { FaqModalComponent } from './faq-modal/faq-modal.component';

@Component({
  selector: 'app-faqs',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent  {
  url = 'faqs';
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['question', 'messages.faq.question', '', true, 'string'],
    ['answer', 'messages.faq.answer', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  delete(data : Faq) {
    this.formService.showDeleteConfirm(data?.question || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }
    
  create() {
    this.formService.openEditCreateModal(FaqModalComponent, 'modal-md', {
      title: 'messages.faq.add_faq',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(FaqModalComponent, 'modal-md', {
      title: 'messages.service.edit_faq',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
