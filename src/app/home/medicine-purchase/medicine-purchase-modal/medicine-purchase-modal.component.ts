import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { PAYMENT_TYPE_ARRAY } from '../medicine-purchase.constant';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-medicine-purchase-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './medicine-purchase-modal.component.html',
  styleUrl: './medicine-purchase-modal.component.scss'
})
export class MedicinePurchaseModalComponent implements OnInit {
  readonly url = 'medicine-purchase';
  title = '';
  isSubmitted = false;
  id = 0;
  clinicId = 0;
  medicinePurchaseForm!: FormGroup;
  medicineInventoryId = 0;
  address = '';

  types = PAYMENT_TYPE_ARRAY;
  clinics = [];
  suppliers = [];
  inventories = [];
  labels = [];

  constructor( 
    private fb: FormBuilder,
    private formService : FormService,
    private apiService : ApiService,
    private toastrService: ToastrService,
    public homeService: HomeService,
    public bsModalRef: BsModalRef 
  ) {}

  ngOnInit(): void {
    this.medicinePurchaseForm = this.fb.group({
      brand_id: ['', []],
      clinic_id: ['', [Validators.required]],
      description: [''],
      note: [''],
      payment_note: [''],
      payment_type: [''],
      tax: [''],
      total: [''],
      net_amount: [''],
      discount: [''],
      shipping_fee: [''],
      medicines: this.fb.array([]) 
    });

    if (this.homeService.selectClinics.length > 1) {
      this.medicinePurchaseForm.controls['clinic_id'].setValidators([Validators.required]);
      this.medicinePurchaseForm.controls['clinic_id'].updateValueAndValidity();
    }

    if(this.clinicId) {
      this.medicinePurchaseForm.controls['clinic_id'].setValue(this.clinicId);
      this.updateClinic(this.clinicId);
    }

    this.addMedicine();
  }

  createMedicineGroup(): FormGroup {
    return this.fb.group({
      medicine_id: ['', Validators.required],
      label_id: ['', Validators.required],
      purchase_price: ['0.00', Validators.required],
      quantity: [0, Validators.required],
      tax_medicine: [0],
      amount: ['0.00']
    });
  }

  get medicines(): FormArray {
    return this.medicinePurchaseForm.get('medicines') as FormArray;
  }

  addMedicine(): void {
    this.medicines.push(this.createMedicineGroup());
  }

  removeMedicine(index: number): void {
    this.medicines.removeAt(index);
  }

  onSubmit(valid : boolean, value : any) {
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

  updateClinic(clinicId : any) {
    this.apiService.get(`${this.url}/get-selection/${clinicId}`).subscribe((res : any) => {
      this.suppliers = res['suppliers'];
      this.labels = res['labels'];
    });
  }

  updateSupplier(supplierId : any) {
    this.apiService.get(`brands/supplier/${supplierId}`).subscribe((res : any) => {
      this.address = res['data']['address'];
      console.log(this.address);
      this.inventories = res['data']['medicines'].map((medicine : any) => {
        return {
          value : medicine.id,
          label: medicine.name
        }
      })
    });
  }
}
