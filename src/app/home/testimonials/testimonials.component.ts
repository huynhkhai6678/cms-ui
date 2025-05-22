import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { Testimonial } from './testimonial.model';
import { TestimonialModalComponent } from './testimonial-modal/testimonial-modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-testimonials',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements AfterViewInit {
  url = 'testimonials';
  apiUrl = environment.apiUrl;
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('nameTemplate') nameTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'template'],
    ['short_description', 'messages.front_patient_testimonial.short_description', '', false, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  ngAfterViewInit(): void {
    this.columnCustomTemplates['name'] = this.nameTemplate;
  }

  delete(data : Testimonial) {
    this.formService.showDeleteConfirm(data?.name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }
    
  create() {
    this.formService.openEditCreateModal(TestimonialModalComponent, 'modal-lg', {
      title: 'messages.front_patient_testimonial.add_front_patient_testimonial',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(TestimonialModalComponent, 'modal-lg', {
      title: 'messages.front_patient_testimonial.edit_front_patient_testimonial',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
