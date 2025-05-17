import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clinic-modal',
  imports: [
    TranslatePipe
  ],
  templateUrl: './clinic-modal.component.html',
  styleUrl: './clinic-modal.component.scss'
})
export class ClinicModalComponent {
  clinics : any[] = [];
  chainName = '';

  constructor(
    public bsModalRef: BsModalRef, 
  ) {}
}
