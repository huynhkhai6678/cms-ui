import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyModalComponent } from './currency-modal/currency-modal.component';

@Component({
  selector: 'app-currencies',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss'
})
export class CurrenciesComponent {
  url = 'currencies';

  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['currency_name', 'messages.currency.currency_name', '', true, 'string'],
    ['currency_icon', 'messages.currency.currency_icon', '', true, 'string'],
    ['currency_code', 'messages.currency.currency_code', '', true, 'string'],
    ['action', 'Action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService
  ) {

  }

  edit(id: number) {
      this.formService.openEditCreateModal(CurrencyModalComponent, 'modal-md', {
        title: 'messages.currency.edit_currency',
        id
      }, () => {
        this.dataTableComponent.reloadData();
      });
    }
  
    delete(id: number, name: string) {
      this.formService.showDeleteConfirm(name)
      .subscribe(confirmed => {
        if (confirmed) {
          this.apiService.delete(`${this.url}/${id}`).subscribe(() => {
            this.dataTableComponent.reloadData();
          })
        }
      });
    }
  
    create() {
      this.formService.openEditCreateModal(CurrencyModalComponent, 'modal-md', {
        title: 'messages.currency.add_currency'
      }, () => {
        this.dataTableComponent.reloadData();
      });
    }
}