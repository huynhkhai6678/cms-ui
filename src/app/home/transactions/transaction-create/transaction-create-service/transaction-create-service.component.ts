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

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service']) {
      const service = changes['service']['currentValue'];
      if (this.serviceForm) {
        this.serviceForm.patchValue(service);
      }
    }
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      service_id : [],
      type: [''],
      discount: [''],
      description: [''],
      dosage: [''],
      frequency: [''],
      administration: [''],
      purpose: [''],
      avaiable_quantity: [0],
    });

    this.watchDiscriptionName();
  }

  submit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) return;

    const price = parseFloat(value.price || 0);
    const qty = parseInt(value.quantity || 0, 10);
    const discount = parseFloat(value.discount || 0);

    value.sub_total = (price * qty) - discount;
    value.frequency = value.frequency ?? '';
    value.purpose = value.purpose ?? '';
    this.serviceSelect.emit(value);
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
