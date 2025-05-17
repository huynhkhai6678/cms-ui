import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinic-chain-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './clinic-chain-modal.component.html',
  styleUrl: './clinic-chain-modal.component.scss'
})
export class ClinicChainModalComponent implements OnInit {
  readonly url = 'clinic-chains';
  title = '';
  clinicChainId = 0;

  clinics = [];

  clinicChainForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder,
    private toastService : ToastrService,
    private formService : FormService,
  ) {}

  ngOnInit(): void {
    this.clinicChainForm = this.fb.group({
      name: ['', [Validators.required]],
      clinic_ids: ['', [Validators.required]],
    });

    this.formService.getInitData(`${this.url}/${this.clinicChainId}`).subscribe((response : any) => {
      setTimeout(() => {
        this.clinicChainForm.patchValue(response['data']);
      }, 100)

      this.clinics = response['clinics'].map((clinic: any) => { return { value : clinic.id, label : clinic.name }});
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.clinicChainId, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastService.error(error?.error?.error);
      }
    })
  }

}
