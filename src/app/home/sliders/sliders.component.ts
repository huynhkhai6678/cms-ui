import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FormService } from '../../services/form.service';
import { SliderModalComponent } from './slider-modal/slider-modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sliders',
  imports: [
    DataTableComponent
  ],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.scss'
})
export class SlidersComponent implements AfterViewInit {
  url = 'sliders';
  apiUrl = environment.apiUrl;
  
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('imageTemplate') imageTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['image', 'messages.slider.title', '', true, 'template'],
    ['title', 'messages.slider.title', '', true, 'string'],
    ['short_description', 'messages.slider.short_description', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  constructor(
    private formService: FormService,
  ) {}

  ngAfterViewInit(): void {
    this.columnCustomTemplates['image'] = this.imageTemplate;
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(SliderModalComponent, 'modal-md', {
      title: 'messages.slider.edit_slider',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
