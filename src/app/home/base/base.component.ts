import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-base',
  imports: [],
  template: '',
})
export class BaseComponent {
  isSubmitted = false;
  url = '';
  title = '';
  id = 0;

  countries = [];
  states = [];
  cities = [];

  readonly bsModalRef = inject(BsModalRef);
  readonly formService = inject(FormService);
  readonly apiService = inject(ApiService);
  readonly locationService = inject(LocationService);

  onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  delete() {
    this.formService.showDeleteConfirm('')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${this.id}`).subscribe(() => {
          this.bsModalRef.hide();
        })
      }
    });
  }

  onCountryChange(event : any) {
    this.locationService.getStatesByCountry(event.value).subscribe((res : any) => {
      this.states = res['data'];
    });
  }

  onStateChange(event : any) {
    this.locationService.getCitiesByState(event.value).subscribe((res : any) => {
      this.cities = res['data'];
    });
  }
}
