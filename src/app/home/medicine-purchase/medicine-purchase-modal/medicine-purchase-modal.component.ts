import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { PAYMENT_TYPE_ARRAY } from '../medicine-purchase.constant';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base/base.component';

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
export class MedicinePurchaseModalComponent extends BaseComponent implements OnInit {
  override url = 'medicine-purchase';
  readonly types = PAYMENT_TYPE_ARRAY;
  readonly fb = inject(FormBuilder);

  medicinePurchaseForm!: FormGroup;
  medicineInventoryId = 0;
  address = '';

  clinics = [];
  suppliers = [];
  inventories = [];
  labels = [];

  ngOnInit(): void {
    this.medicinePurchaseForm = this.fb.group({
      brand_id: ['', []],
      clinic_id: ['', [Validators.required]],
      description: [''],
      note: [null],
      payment_note: [null],
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
    this.watchMedicinesChanges();
    this.watchDiscountAndShipping();
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
    const medicines = this.medicinePurchaseForm.get('medicines') as FormArray;
    let allValid = true;
    medicines.controls.forEach(control => {
      control.markAllAsTouched();
      if (control.invalid) {
        allValid = false;
      }
    });

    // If all valid, allow adding a new one
    if (allValid) {
      medicines.push(this.createMedicineGroup());
    }
  }

  removeMedicine(index: number): void {
    this.medicines.removeAt(index);
  }

  updateClinic(clinicId : any) {
    this.apiService.get(`${this.url}/get-selection/${clinicId}`).subscribe((res : any) => {
      this.suppliers = res['suppliers'];
      this.labels = res['labels'];
      this.resetMedicines();
    });
  }

  updateSupplier(supplierId : any) {
    this.apiService.get(`brands/supplier/${supplierId}`).subscribe((res : any) => {
      this.address = res['data']['address'];
      this.inventories = res['data']['medicines'].map((medicine : any) => {
        return {
          value : medicine.id,
          label: medicine.name
        }
      });
      this.resetMedicines();
    });
  }

  resetMedicines(): void {
    const medicines = this.medicinePurchaseForm.get('medicines') as FormArray;
    medicines.clear();
    // this.medicinePurchaseForm.reset();
    medicines.push(this.createMedicineGroup());
  }

  watchMedicinesChanges() {
    this.medicinePurchaseForm.get('medicines')?.valueChanges.subscribe(() => {
      this.recalculateTotals();
    });
  }

  watchDiscountAndShipping() {
    this.medicinePurchaseForm.get('discount')?.valueChanges.subscribe(() => {
      this.recalculateTotals();
    });

    this.medicinePurchaseForm.get('shipping_fee')?.valueChanges.subscribe(() => {
      this.recalculateTotals();
    });
  }

  recalculateTotals() {
    const medicines = this.medicinePurchaseForm.get('medicines') as FormArray;
    let total = 0;
    let totalTax = 0;

    medicines.controls.forEach((medicineGroup: AbstractControl) => {
      const medicine = medicineGroup.value;
      const price = parseFloat(medicine.purchase_price || 0);
      const qty = parseInt(medicine.quantity || 0, 10);
      const taxPercent = parseFloat(medicine.tax_medicine || 0);

      const subtotal = price * qty;
      const tax = (subtotal * taxPercent) / 100;
      const amount = subtotal + tax;

      medicineGroup.get('amount')?.setValue(amount.toFixed(2), { emitEvent: false });

      total += subtotal;
      totalTax += tax;
    });

    const discount = parseFloat(this.medicinePurchaseForm.get('discount')?.value || 0);
    const shipping = parseFloat(this.medicinePurchaseForm.get('shipping_fee')?.value || 0);
    const netAmount = total + totalTax - discount + shipping;

    this.medicinePurchaseForm.patchValue({
      total: total.toFixed(2),
      tax: totalTax.toFixed(2),
      net_amount: netAmount.toFixed(2)
    }, { emitEvent: false });
  }
}
