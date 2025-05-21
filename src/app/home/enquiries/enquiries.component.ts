import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { EnquiryModalComponent } from './enquiry-modal/enquiry-modal.component';
import { FormsModule } from '@angular/forms';
import { Enquiry } from './enquiry.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquiries',
  imports: [
    DataTableComponent,
    DatePipe,
    FormsModule,
  ],
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.scss'
})
export class EnquiriesComponent implements AfterViewInit {
  url = 'enquiries';
  STATUTES = [
    { name: 'All', value : -1 },
    { name: 'Read', value : 1},
    { name: 'Unread', value : 1},
  ]
  clinics = [];
  filterParams = {
    view: -1,
  };
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'string'],
    ['message', 'messages.web.message', '', true, 'string'],
    ['status', 'messages.web.status', '', false, 'template'],
    ['date', 'messages.doctor.created_at', '', false, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['status'] = this.statusTemplate;
    this.columnCustomTemplates['date'] = this.dateTemplate;
  }

  view(id: number) {
    this.formService.openEditCreateModal(EnquiryModalComponent, 'modal-lg', {
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
    
  delete(row: Enquiry) {
    this.formService.showDeleteConfirm(row.name)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  filterChange() {
    this.dataTableComponent.handleFilterChange(this.filterParams);
  }

}
