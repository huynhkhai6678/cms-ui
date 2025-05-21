import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Select2 } from 'ng-select2-component';

@Component({
  selector: 'app-specialization-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './specialization-modal.component.html',
  styleUrl: './specialization-modal.component.scss'
})
export class SpecializationModalComponent implements OnInit {
  readonly url = 'specializations';
  title = '';
  id = 0;

  specializationForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    public homeService : HomeService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.specializationForm = this.fb.group({
      name: ['', [Validators.required]],
      clinic_id : ['']
    });

    if (this.homeService.selectClinics.length > 1) {
      this.specializationForm.controls['clinic_id'].setValidators([Validators.required]);
      this.specializationForm.controls['clinic_id'].updateValueAndValidity();
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.specializationForm.patchValue(response['data']);
      }
    });
  }

  submit(value : any, valid : boolean) {
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
        this.toastService.error(error?.error?.error);
      }
    })
  }
}
