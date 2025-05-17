import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { ClinicChainModalComponent } from './clinic-chain-modal/clinic-chain-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClinicModalComponent } from './clinic-modal/clinic-modal.component';

@Component({
  selector: 'app-clinic-chain',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './clinic-chain.component.html',
  styleUrl: './clinic-chain.component.scss'
})
export class ClinicChainComponent implements AfterViewInit {

  url = 'clinic-chains';
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;
  @ViewChild('clinicNameTemplate') clinicNameTemplate!: TemplateRef<any>;
  columnCustomTemplates : Record<string, any> = {};

  constructor(
      private apiService: ApiService,
      public modalService: BsModalService,
      private formService: FormService
  ) {
  
  }

  ngAfterViewInit() {
    this.columnCustomTemplates['clinic_name'] = this.clinicNameTemplate;
  }

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'Name', '', true, 'string'],
    ['clinic_name', 'Clinic name', '', false, 'template'],
    ['action', 'Action', '', false, 'action'],
  ];

  edit(id: number) {
    this.formService.openEditCreateModal(ClinicChainModalComponent, 'modal-lg', {
      title: 'messages.clinic_chains.edit_clinic_chain',
      clinicChainId: id
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
    this.formService.openEditCreateModal(ClinicChainModalComponent, 'modal-lg', {
      title: 'messages.clinic_chains.add_clinic_chain'
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  showClinic(item : any) {
    this.modalService.show(ClinicModalComponent, {
      class: 'modal-md',
      initialState : {
        clinics : item.clinics,
        chainName : item.name
      }
    });
  }

}
