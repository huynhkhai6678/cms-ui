import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { MEDICINE_TYPE_ARRAY } from '../medicines.constant';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-medicine-modal',
  imports: [
    ReactiveFormsModule,
    Select2,
    TranslatePipe,
    ImageUploadComponent
],
  templateUrl: './medicine-modal.component.html',
  styleUrl: './medicine-modal.component.scss'
})
export class MedicineModalComponent extends BaseComponent implements OnInit {
  override url = 'medicines';
  readonly fb = inject(FormBuilder);

  medicineForm!: FormGroup;

  readonly types = MEDICINE_TYPE_ARRAY;
  categories: any[] = [];
  brands: any[] = [];
  uoms: any[] = [];
  frequencies: any[] = []; 
  purposes: any[] = []; 
  medicine: any;

  ngOnInit(): void {
    this.medicineForm = this.fb.group({
      clinic_ids: [[], []],
      clinic_id: ['', []],
      type: [1, Validators.required],
      category_ids: [[]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      salt_composition: [''],
      code: [''],
      brand_ids: [[]],
      buying_price: [''],
      selling_price: [''],
      default_dispense: [''],
      uom: ['', [Validators.required]],
      dosage: [''],
      frequency: [''],
      administration: [''],
      purpose: [''],
      side_effects: [''],
      packing: [''],
      comment: [''],
      image : [null],
      inventory_image: [''],
      low_stock_level: [''],
      reorder_level: [''],
      expiration_warning: ['']
    });

    if (this.homeService.selectClinics.length > 1) {
      this.medicineForm.controls['clinic_id'].setValidators([Validators.required]);
      this.medicineForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.id) {
      // case create new medicine ==> Allow create multiple clinic
      this.medicineForm.controls['clinic_ids'].setValue([this.clinicId]);
      this.medicineForm.controls['clinic_ids'].setValidators([Validators.required]);
      this.medicineForm.controls['clinic_ids'].updateValueAndValidity();
      this.medicineForm.controls['clinic_id'].setValidators([]);
      this.medicineForm.controls['clinic_id'].updateValueAndValidity();
    } else {
      // case edit medicine ==> Not allow edit multiple clinic
      this.medicineForm.controls['clinic_ids'].setValue([]);
      this.medicineForm.controls['clinic_ids'].setValidators([]);
      this.medicineForm.controls['clinic_ids'].updateValueAndValidity();
      this.medicineForm.controls['clinic_id'].setValidators([Validators.required]);
      this.medicineForm.controls['clinic_id'].updateValueAndValidity();
    }

    if (!this.clinicId) {
      this.medicineForm.controls['clinic_id'].setValue(this.clinicId);
    }

    // Example for fetching data from an API
    this.loadData();
    this.loadFormSelection(this.clinicId);
  }

  loadData() {
    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        setTimeout(() => {
          this.medicineForm.patchValue(response['data']);
        }, 200)
      }
    });
  }

  loadFormSelection(clinicId : any) {
    this.formService.getInitData(`${this.url}/form-selection/${clinicId}`).subscribe((response : any) => {
      this.categories = response['categories'];
      this.brands = response['brands'];
      this.uoms = response['uoms'];
      this.frequencies = response['frequencies'];
      this.purposes = response['purposes'];
    });
  }
}
