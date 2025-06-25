import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeService } from '../../home.service';
import { Select2, Select2Value } from 'ng-select2-component';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionCreateServiceComponent } from './transaction-create-service/transaction-create-service.component';
import { SingleSelect2Option } from '../../../services/share.service';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.model';
import { MedicalCertificateComponent } from '../medical-certificate/medical-certificate.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import moment from 'moment';
import { downloadFile } from '../../../utils/download-file.util';
import { TransactionCreateHistoryComponent } from './transaction-create-history/transaction-create-history.component';

@Component({
  selector: 'app-transaction-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select2,
    DateInputComponent,
    RouterLink,
    TranslatePipe,
    BsDropdownModule,
    TransactionCreateServiceComponent,
    TransactionCreateHistoryComponent
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
  transaction : any = null;

  patientId = signal<number>(0);

  constructor(
    private fb: FormBuilder,
    private apiService : ApiService,
    private formService : FormService,
    private activeRoute : ActivatedRoute,
    private router : Router,
    private toastrService: ToastrService,
    public homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.activeRoute.params.subscribe((params : any) => {
      this.id = parseInt(params['id']);
      this.getTransactionData(this.id);
    });

    this.activeRoute.queryParams.subscribe((queryParams : any) => {
      if (queryParams['clinicId']) {
        this.updateClinic(queryParams['clinicId']);
      }

      if (queryParams['visitId']) {
        this.transactionForm.controls['visit_id'].setValue(queryParams['visitId']);
      }
    });
  }

  initForm() {
    this.transactionForm = this.fb.group({
      clinic_id: ['', []],
      doctor_id: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      visit_id: [null],
      service_id: [''],
      important_notes: [''],
      invoice_number: ['', Validators.required],
      bill_date: ['', Validators.required],
      status: [0],
      services: this.fb.array([]),
      note: [null],
      payment_note: [null],
      payment_type: [null],
      tax: [null],
      total: [null],
      net_amount: [null],
      discount: [null],
    });

    if (this.homeService.selectClinics.length > 1) {
      this.transactionForm.controls['clinic_id'].setValidators([Validators.required]);
      this.transactionForm.controls['clinic_id'].updateValueAndValidity();
    }

    this.watchDiscountAndShipping();
    this.watchServicesChanges()
  }

  getTransactionData(id: number) {
    this.apiService.get(`${this.url}/${id}`).subscribe((res : any) => {
      // Store medical certificate id
      if (res['data']) {
        this.transaction = res['data'];
      }

      if (res['data'] && !res['data']['id']) {
        this.transactionForm.patchValue(res['data']);
      }

      if (res['data'] && res['data']['id']) {
        this.updateClinic(res['data']['clinic_id'], res['data']);
      }

      if (res['data'] && res['data']['user_id']) {
        this.patientId.set(res['data']['user_id']);
        console.log(this.patientId());
      }
    })
  }

  createServiceGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      service_id: [''],
      type: [''],
      name: [''],
      description: [''],
      quantity: [0],
      price: [0],
      discount: [null],
      sub_total: [0],
      uom: [''],
      dosage: [''],
      frequency: [''],
      administration: [''],
      purpose: [''],
    });
  }

  onPatientChange(patientId : any) {
    this.patientId.set(patientId);
  }

  updateClinic(clinicId : Select2Value, formData : any = null) {
    this.transactionForm.controls['clinic_id'].setValue(clinicId);

    this.apiService.get(`${this.url}/get-selection/${clinicId}`).subscribe((res : any) => {
      const {
        doctors,
        patients,
        payment_types: paymentTypes,
        frequencies,
        purposes,
        medicines,
        clinic_services: clinicServices
      } = res;

      this.doctors = doctors;
      this.patients = patients;
      this.paymentTypes = paymentTypes;
      this.frequencies = frequencies;
      this.purposes = purposes;
      this.serviceList = [
        ...medicines.map((medicine: any) => ({
          label: `MEDICINE - ${medicine.name}`,
          name: medicine.name,
          value: medicine.id,
          service_id: medicine.id,
          price : medicine.buying_price,
          type: 'Inventories',
          uom: medicine.uom,
          avaiable_quantity: medicine.available_quantity
        })),
        ...clinicServices.map((service: any) => ({
          label: `SERVICE - ${service.name}`,
          name: service.name,
          value: service.id,
          service_id: service.id,
          price : service.price,
          type: 'Services',
          uom: null,
          avaiable_quantity: 0
        }))
      ];
      this.resetServices();

      if (formData) {
        setTimeout(() => {
          this.transactionForm.patchValue(formData);
          this.patchServiceData(formData.services);
        }, 100);
      }
    });
  }

  patchServiceData(formDataServices : TransactionService[]) {
    const serviceFormArray = this.transactionForm.get('services') as FormArray;
    formDataServices.forEach((service : TransactionService) => {
      const formGroup = this.createServiceGroup();
      formGroup.patchValue(service);
      serviceFormArray.insert(0, formGroup);
    })
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

    // format data
    value.total = parseFloat(value.total || 0);
    value.net_amount = parseFloat(value.net_amount) || 0;
    value.discount = parseFloat(value.discount || 0);
    value.tax = parseFloat(value.tax || 0);
    value.bill_date = moment(value.bill_date, 'DD/MM/YYYY').toDate();
    value.status = value.status ? 1 : 0;

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.toastrService.success('Transaction create success');
        this.router.navigate(['/home/transactions']);
      },
      error: (error) => {
        this.toastrService.error(error.error);
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
        services.insert(0, formGroup);
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

  openMedicalCertificate(transactionCertificateId : number) {
    this.formService.openEditCreateModal(MedicalCertificateComponent, 'modal-lg', {
      title: 'messages.transaction.medical_certificate',
      id : transactionCertificateId,
      transactionInvoiceId : this.id
    });
  }

  openLabelPage(id: number) {
    const url = `transactions-label/${id}`;
    window.open(url, '_blank');
  }

  exportInvoice() {
    this.apiService.downloadFile(`transactions/export-invoice/${this.id}`).subscribe({
      next : (response) => {
        downloadFile(response, 'invoice.pdf');
      },
      error : (error) => {
        this.toastrService.error('Error downloading PDF:', error);
      }
    })
  }

  exportReceipt() {
    this.apiService.downloadFile(`transactions/export-receipt/${this.id}`).subscribe({
      next : (response) => {
        downloadFile(response, 'receipt.pdf');
      },
      error : (error) => {
        this.toastrService.error('Error downloading PDF:', error);
      }
    })
  }
}
