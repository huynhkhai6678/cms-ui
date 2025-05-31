import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DateInputComponent } from '../../../shared/date-input/date-input.component';
import { debounceTime } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-medicine-inventory-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    DateInputComponent
  ],
  templateUrl: './medicine-inventory-modal.component.html',
  styleUrl: './medicine-inventory-modal.component.scss'
})
export class MedicineInventoryModalComponent implements OnInit {
  readonly url = 'medicine-inventories';
  title = '';
  isSubmitted = false;
  id = 0;
  inventoryForm!: FormGroup;

  uom = '';
  minDate = '';
  medicineId  = '';

  constructor( 
    private fb: FormBuilder,
    private formService : FormService,
    private toastrService: ToastrService,
    public bsModalRef: BsModalRef 
  ) {}

  ngOnInit(): void {
    this.minDate = moment().format('DD/MM/YYYY');

    this.inventoryForm = this.fb.group({
      medicine_id : [0, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      bonus: [null],
      uom: [''],
      price: [null, [Validators.required]],
      cost_per_unit: [''],
      batch_number: [null],
      expiration_date: [null],
      description: [null],
      available_quantity : ['']
    });

    this.inventoryForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.updateCostPerUnit();
    });

    this.inventoryForm.controls['uom'].setValue(this.uom);
    this.inventoryForm.controls['medicine_id'].setValue(parseInt(this.medicineId));

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.inventoryForm.patchValue(response['data']);
      }
    });
  }

  updateCostPerUnit(): void {
    const quantity = Number(this.inventoryForm.get('quantity')?.value || 0);
    const bonus = Number(this.inventoryForm.get('bonus')?.value || 0);
    const price = Number(this.inventoryForm.get('price')?.value || 0);

    const totalUnits = quantity + bonus;

    const costPerUnit =
      totalUnits > 0 ? price / totalUnits : 0;

    this.inventoryForm.get('cost_per_unit')?.setValue(
      costPerUnit.toFixed(2),
      { emitEvent: false }
    );

    this.inventoryForm.get('available_quantity')?.setValue(
      totalUnits,
      { emitEvent: false }
    )
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
}
