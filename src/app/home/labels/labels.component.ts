import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { LabelModalComponent } from './label-modal/label-modal.component';
import { Label } from './label.model';
import { LABEL_TYPE } from './label.contant';

@Component({
  selector: 'app-labels',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.scss'
})
export class LabelsComponent implements AfterViewInit {
  readonly url = 'labels';
  readonly TYPES = LABEL_TYPE;
  readonly apiService = inject(ApiService);
  readonly formService = inject(FormService);

  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('typeTemplate') typeTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'string'],
    ['type', 'messages.web.message', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['type'] = this.typeTemplate;
  }

  create() {
    this.formService.openEditCreateModal(LabelModalComponent, 'modal-md', {
      title: 'messages.label.new_label',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(LabelModalComponent, 'modal-md', {
      title: 'messages.label.edit_label',
      clinicId : this.dataTableComponent.getClinicId(),
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
    
  delete(row: Label) {
    this.formService.showDeleteConfirm(row.name)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }
}
