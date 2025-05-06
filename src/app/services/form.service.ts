import { Injectable, Type } from '@angular/core';
import { ApiService } from './api.service';
import { ComfirmModalComponent } from '../shared/comfirm-modal/comfirm-modal.component';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(
    private apiService: ApiService,
    public modalService: BsModalService,
  ) {}

  getInitData(url: string) {
    return this.apiService.get(url);
  }

  openEditCreateModal<T>(
    component: Type<T>,
    modalClass = 'modal-md',
    initialState: Partial<T> = {}
  ): BsModalRef {
    return this.modalService.show(component, {
      class: modalClass,
      initialState
    });
  }

  showDeleteConfirm(message: string, icon = '<i class="fa-solid fa-circle-exclamation"></i>' , title = 'js.delete', confirmText = 'js.yes', cancelText = 'js.no') {
    const result = new Subject<boolean>();
    const bsModalRef: BsModalRef = this.modalService.show(ComfirmModalComponent);

    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
    bsModalRef.content.confirmBtnText = confirmText;
    bsModalRef.content.cancelBtnText = cancelText;
    bsModalRef.content.icon = icon;

    const subscription = this.modalService.onHidden.subscribe(() => {
      result.next(bsModalRef.content.result === true);
      result.complete();
      subscription.unsubscribe();
    });

    return result.asObservable();
  }
}