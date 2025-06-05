import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { SingleSelect2Option } from '../../../../services/share.service';

@Component({
  selector: 'app-transaction-create-service',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './transaction-create-service.component.html',
  styleUrl: './transaction-create-service.component.scss'
})
export class TransactionCreateServiceComponent implements OnInit, OnChanges {
  @Input() frequencies : SingleSelect2Option[] = [];
  @Input() purposes : SingleSelect2Option[] = [];
  @Input() service : any = {};

  @Output() serviceSelect = new EventEmitter<any>();

  serviceForm! : FormGroup;
  isSubmitted = false;
  avaiableQuantity = 0;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service']) {
      const service = changes['service']['currentValue'];
      if (this.serviceForm) {
        this.serviceForm.patchValue(service);
        this.avaiableQuantity = service.avaiable_quantity ?? 0;
      }
    }
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      uom: [''],
      service_id : [],
      type: [''],
      discount: [null],
      description: [''],
      dosage: [''],
      frequency: [''],
      administration: [''],
      purpose: [''],
    });

    this.watchDiscriptionName();
  }

  submit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) return;

    value.price = parseFloat(value.price || 0);
    value.quantity = parseFloat(value.quantity || 0);
    value.discount = parseFloat(value.discount || 0);

    value.sub_total = (value.quantity * value.price) - value.discount;
    value.frequency = value.frequency ?? '';
    value.purpose = value.purpose ?? '';
    value.uom = value.uom ?? '';

    this.serviceSelect.emit(value);
    this.serviceForm.reset();
    this.isSubmitted = false;
  }

  watchDiscriptionName() {
    this.serviceForm.get('dosage')?.valueChanges.subscribe(() => {
      this.recalculateDescription();
    });

    this.serviceForm.get('frequency')?.valueChanges.subscribe(() => {
      this.recalculateDescription();
    });

    this.serviceForm.get('administration')?.valueChanges.subscribe(() => {
      this.recalculateDescription();
    });

    this.serviceForm.get('purpose')?.valueChanges.subscribe(() => {
      this.recalculateDescription();
    });

  }

  recalculateDescription() {
    const dosage = this.serviceForm.get('dosage')?.value ?? '';
    const frequency = this.serviceForm.get('frequency')?.value ?? '';
    const administration = this.serviceForm.get('administration')?.value ?? '';
    const purpose = this.serviceForm.get('purpose')?.value ? `- ${this.serviceForm.get('purpose')?.value}` : '';
    const description = `${dosage} ${frequency} ${administration} ${purpose}`;
    this.serviceForm.get('description')?.setValue(description);
  }
}
