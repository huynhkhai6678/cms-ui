import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { Category } from './category.model';

@Component({
  selector: 'app-categories',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit {
  url = 'categories';
  clinics = [];
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'string'],
    ['is_active', 'messages.common.active', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['is_active'] = this.activeTemplate;
  }

  create() {
    this.formService.openEditCreateModal(CategoryModalComponent, 'modal-md', {
      title: 'messages.medicine.new_medicine_category',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(CategoryModalComponent, 'modal-lg', {
      title: 'messages.medicine.edit_medicine_category',
      clinicId : this.dataTableComponent.getClinicId(),
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
    
  delete(row: Category) {
    this.formService.showDeleteConfirm(row.name)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  activeCategory(id: number, target : any) { 
    console.log(id);
    console.log(target);
  }

  changeStatus(input: any) {
    this.dataTableComponent.handleFilterChange({ is_active : input.value});
  }
}
