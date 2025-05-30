import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit {
  readonly url = 'categories';
  title = '';
  id = 0;
  clinicId = 0;

  categoryForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    private formService : FormService,
    public homeService : HomeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      clinic_id: [''],
      name: ['', [Validators.required]],
      is_active: [true],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.categoryForm.controls['clinic_id'].setValidators([Validators.required]);
      this.categoryForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      this.categoryForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.categoryForm.patchValue(response['data']);
      }
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) return;

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastrService.error(error);
      }
    })
  }
}
