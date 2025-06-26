import { Component, inject, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FormService } from '../../services/form.service';
import { Subscribe } from './subscribe.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-subscribes',
  imports: [
    DataTableComponent
  ],
  templateUrl: './subscribes.component.html',
  styleUrl: './subscribes.component.scss'
})
export class SubscribesComponent {
  readonly url = 'subscribers';
  readonly apiService = inject(ApiService);
  readonly formService = inject(FormService);

  columnCustomTemplates : Record<string, any> = {};
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['email', 'messages.common.email', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  delete(row: Subscribe) {
    this.formService.showDeleteConfirm(row.email)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }
}
