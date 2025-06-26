import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-faq-modal',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './faq-modal.component.html',
  styleUrl: './faq-modal.component.scss'
})
export class FaqModalComponent extends BaseComponent implements OnInit {
  override url = 'faqs';
  readonly fb = inject(FormBuilder);

  faqForm! : FormGroup;

  ngOnInit(): void {
    this.faqForm = this.fb.group({
      clinic_id: [''],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.faqForm.controls['clinic_id'].setValidators([Validators.required]);
      this.faqForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      this.faqForm.controls['clinic_id'].setValue(this.clinicId);
    }

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.faqForm.patchValue(response['data']);
      }
    });
  }
}
