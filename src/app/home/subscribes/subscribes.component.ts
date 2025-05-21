import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FormService } from '../../services/form.service';
import { Subscribe } from './subscribe.model';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribes',
  imports: [
    FormsModule,
    DataTableComponent
  ],
  templateUrl: './subscribes.component.html',
  styleUrl: './subscribes.component.scss'
})
export class SubscribesComponent {
  url = 'subscribers';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

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
