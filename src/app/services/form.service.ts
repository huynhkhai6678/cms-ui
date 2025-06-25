import { Injectable, Type } from '@angular/core';
import { ApiService } from './api.service';
import { ComfirmModalComponent } from '../shared/comfirm-modal/comfirm-modal.component';
import { Observable, Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    public modalService: BsModalService,
  ) {}

  getInitData(url: string) {
    return this.apiService.get(url);
  }

  openEditCreateModal<T>(
    component: Type<T>,
    modalClass = 'modal-md',
    initialState: Partial<T> = {},
    onHideCallback? : () => void
  ): BsModalRef {
    const modalRef = this.modalService.show(component, {
      class: modalClass,
      initialState
    });
  
    if (onHideCallback) {
      modalRef.onHide?.subscribe(() => {
        onHideCallback();
      });
    }

    return modalRef;
  }

  checkInvalidFields(form : FormGroup) {
    const invalidFields : any = [];
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control?.invalid) {
        invalidFields.push(field);
      }
    });
    console.log(invalidFields);
  }

  submitForm(
    url: string,
    id: number | null,
    value: any,
  ): Observable<any> {
    if (id) {
      return this.apiService.patch(`${url}/${id}`, value);
    } else {
      return this.apiService.post(url, value);
    }
  }

  submitFormWithImage(
    url: string,
    id: number | null,
    value: any,
  ): Observable<any> {
    if (id) {
      return this.apiService.postFileWithParams(`${url}/${id}`, value);
    } else {
      return this.apiService.postFileWithParams(url, value);
    }
  }

  showDeleteConfirm(name: string, icon = '<i class="fa-solid fa-circle-exclamation"></i>' , title = 'js.delete', confirmText = 'js.yes', cancelText = 'js.no') {
    const result = new Subject<boolean>();
    const bsModalRef: BsModalRef = this.modalService.show(ComfirmModalComponent);

    this.translateService.get('js.are_you_sure').subscribe((message: string) => {
      const bodyMessage = name ? `${message} "${name}" ?` : `${message}`;
      bsModalRef.content.title = title;
      bsModalRef.content.message = bodyMessage;
      bsModalRef.content.confirmBtnText = confirmText;
      bsModalRef.content.cancelBtnText = cancelText;
      bsModalRef.content.icon = icon;
    })

    const subscription = this.modalService.onHidden.subscribe(() => {
      result.next(bsModalRef.content.result === true);
      result.complete();
      subscription.unsubscribe();
    });

    return result.asObservable();
  }

  showConfirmModal(name: string, icon = '<i class="fa-solid fa-circle-exclamation"></i>' , title = 'js.delete', confirmText = 'js.yes', cancelText = 'js.no') {
    const result = new Subject<boolean>();
    const bsModalRef: BsModalRef = this.modalService.show(ComfirmModalComponent);

    this.translateService.get(name).subscribe((message: string) => {
      const bodyMessage = `${message} "${name}" ?`;
      bsModalRef.content.title = title;
      bsModalRef.content.message = bodyMessage;
      bsModalRef.content.confirmBtnText = confirmText;
      bsModalRef.content.cancelBtnText = cancelText;
      bsModalRef.content.showCancelText = false;
      bsModalRef.content.icon = icon;
    })

    const subscription = this.modalService.onHidden.subscribe(() => {
      result.next(bsModalRef.content.result === true);
      result.complete();
      subscription.unsubscribe();
    });

    return result.asObservable();
  }
}