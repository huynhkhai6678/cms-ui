import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

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
export class ClinicChainModalComponent extends BaseComponent implements OnInit {
  override url = 'clinic-chains';
  clinicChainId = 0;
  clinics = [];
  clinicChainForm! : FormGroup;

  readonly fb = inject(FormBuilder);

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
}
