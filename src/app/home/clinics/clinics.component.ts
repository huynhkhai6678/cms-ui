import { AfterViewInit, Component, computed, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-clinics',
  imports: [
    DataTableComponent
  ],
  standalone: true,
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.scss'
})
export class ClinicsComponent implements AfterViewInit { 
  url = '/clinics';
  @ViewChild('contactNumberTemplate') contactNumberTemplate!: TemplateRef<any> ;
  columnCustomTemplates : {[key: string]: any } = {};

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'Name', '', true, 'string'],
    ['type', 'Type', '', true, 'select'],
    ['address1', 'address', '', true, 'string'],
    ['state_name', 'State', '', true, 'string'],
    ['postal_code', 'Postal code', '', false, 'string'],
    ['contact_number', 'Contact number', '', false, 'template'],
    ['action', 'Action', '', false, 'action'],
  ];

  constructor(
    public apiService: ApiService,
  ) {

  }

  ngAfterViewInit() {
    this.columnCustomTemplates['contact_number'] = this.contactNumberTemplate;
  }

  editClinic(id: number) {
    console.log(id);
  }

  delete(id: number) {
    console.log(id);
  }
}
