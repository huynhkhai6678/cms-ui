import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeService } from '../../home.service';
import { Select2 } from 'ng-select2-component';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionCreateServiceComponent } from './transaction-create-service/transaction-create-service.component';
import { SingleSelect2Option } from '../../../services/share.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select2,
    DateInputComponent,
    RouterLink,
    TranslatePipe,
    TransactionCreateServiceComponent
  ],
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.scss'
})
export class TransactionCreateComponent implements OnInit {
  readonly url = 'transactions';
  id = 0;
  clinicId = 0;
  isSubmitted = false;

  transactionForm!: FormGroup;

  doctors : SingleSelect2Option[] = [];
  patients : SingleSelect2Option[] = [];
  serviceList : any[] = [];
  paymentTypes : SingleSelect2Option[] = [];

  frequencies : SingleSelect2Option[] = []; 
  purposes : SingleSelect2Option[] = []; 

  showCreateForm = false;
  createService : any = {};
  currentEditIndex = -1;

  constructor(
    private fb: FormBuilder,
    private apiService : ApiService,
    private formService : FormService,
    private activeRoute : ActivatedRoute,
    private toastrService: ToastrService,
    public homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.activeRoute.params.subscribe((params : any) => {
      console.log(params['id']);
    });

    this.activeRoute.queryParams.subscribe((queryParams : any) => {
      const clinicId = queryParams['clinicId'];
      this.updateClinic(clinicId);
    });
  }

  initForm() {
    this.transactionForm = this.fb.group({
      clinic_id: ['', []],
      doctor_id: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      service_id: [''],
      important_notes: [''],
      invoice_number: ['', Validators.required],
      bill_date: ['', Validators.required],
      status: [0],
      services: this.fb.array([]),
      note: [null],
      payment_note: [null],
      payment_type: [''],
      tax: [''],
      total: [''],
      net_amount: [''],
      discount: [''],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.transactionForm.controls['clinic_id'].setValidators([Validators.required]);
      this.transactionForm.controls['clinic_id'].updateValueAndValidity();
    }

    this.watchDiscountAndShipping();
    this.watchServicesChanges()
  }

  createServiceGroup(): FormGroup {
    return this.fb.group({
      service_id: [''],
      type: [''],
      name: [''],
      description: [''],
      quantity: [0],
      price: [0],
      discount: [0],
      sub_total: [0],
      dosage: [''],
      frequency: [''],
      administration: [''],
      purpose: [''],
    });
  }

  updateClinic(clinicId : any) {
    this.transactionForm.controls['clinic_id'].setValue(clinicId);

    this.apiService.get(`${this.url}/get-selection/${clinicId}`).subscribe((res : any) => {
      this.doctors = res['doctors'];
      this.patients = res['patients'];
      this.paymentTypes = res['payment_types'];
      this.frequencies = res['frequencies'];
      this.purposes = res['purposes'];

      // Format services 
      const medicines = res['medicines'];
      const clinicServices = res['clinic_services'];
      medicines.forEach((medicine : any) => {
        this.serviceList.push({
          label : `MEDICINE - ${medicine.name}`,
          name  :  medicine.name,
          value : medicine.id,
          service_id : medicine.id,
          type : 'Inventories',
          uom: medicine.uom,
          avaiable_quantity : medicine.available_quantity
        })
      });
      clinicServices.forEach((service : any) => {
        this.serviceList.push({
          label : `SERVICE - ${service.name}`,
          name  : service.name,
          value : service.id,
          service_id : service.id,
          uom: null,
          type : 'Services',
          avaiable_quantity: 0
        })
      });

      this.resetServices();
    });
  }

  get services(): FormArray {
    return this.transactionForm.get('services') as FormArray;
  }

  resetServices(): void {
    const services = this.transactionForm.get('services') as FormArray;
    services.clear();
  }

  onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) return;

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
      },
      error: (error) => {
        this.toastrService.error(error);
      }
    })
  }

  addService(service : any) {
    if (service) {
      const services = this.transactionForm.get('services') as FormArray;
      if (this.currentEditIndex < 0) {
        // Create
        const formGroup = this.createServiceGroup();
        formGroup.patchValue(service);
        services.push(formGroup);
      } else {
        // Edit
        const control = this.services.at(this.currentEditIndex);
        control.setValue(service);
      }
    }
    this.showCreateForm = false;
    this.transactionForm.controls['service_id'].setValue('');
    this.currentEditIndex = -1;
  }

  openCreateServiceForm(event : any) {
    const option = event.options[0];
    this.showCreateForm = true;
    this.createService = option;
  }

  watchServicesChanges() {
    this.transactionForm.get('services')?.valueChanges.subscribe(() => {
      this.recalculateTotals();
    });
  }

  watchDiscountAndShipping() {
    this.transactionForm.get('discount')?.valueChanges.subscribe(() => {
      this.recalculateTotals();
    });

    this.transactionForm.get('tax')?.valueChanges.subscribe(() => {
      this.recalculateTotals();
    });
  }

  removeService(index: number): void {
    this.services.removeAt(index);
    this.currentEditIndex = -1;
  }

  editService(index: number) {
    const services = this.transactionForm.get('services') as FormArray;
    const serviceFormValue = services.at(index).value;
    this.currentEditIndex = index;
    this.createService = serviceFormValue;
    this.showCreateForm = true;
  }

  recalculateTotals() {
    const services = this.transactionForm.get('services') as FormArray;
    let total = 0;

    services.controls.forEach((serviceGroup: AbstractControl) => {
      const service = serviceGroup.value;
      const amount = service.sub_total;
      total += amount;
    });

    const discount = parseFloat(this.transactionForm.get('discount')?.value || 0);
    const tax = parseFloat(this.transactionForm.get('tax')?.value || 0);
    const netAmount = total - discount + tax;

    this.transactionForm.patchValue({
      total: total.toFixed(2),
      net_amount: netAmount.toFixed(2)
    }, { emitEvent: false });
  }
}
