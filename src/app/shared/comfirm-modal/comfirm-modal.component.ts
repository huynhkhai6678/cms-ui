import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-comfirm-modal',
  imports: [
    TranslatePipe
  ],
  templateUrl: './comfirm-modal.component.html',
  styleUrl: './comfirm-modal.component.scss'
})
export class ComfirmModalComponent {
  title = 'Confirm';
  message = '';
  confirmBtnText = 'OK';
  cancelBtnText = 'Cancel';
  icon = '<i class="fa-solid fa-circle-exclamation"></i>';
  showCancelText = true;

  public result: boolean | undefined;

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }

  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }
}
