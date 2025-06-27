import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  template: ''
})
export class MockDataTableComponent {
  @Input() data: any;
  reloadData = jasmine.createSpy('reloadData');
  handleFilterChange = jasmine.createSpy('handleFilterChange');
  getClinicId = jasmine.createSpy('getClinicId');
}