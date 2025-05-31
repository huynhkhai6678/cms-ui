import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslatePipe } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { MEDICINE_USAGE_TYPE_ARRAY } from '../medicine-inventory-usages.constant';

@Component({
  selector: 'app-medicine-inventory-usage-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Select2
  ],
  templateUrl: './medicine-inventory-usage-modal.component.html',
  styleUrl: './medicine-inventory-usage-modal.component.scss'
})
export class MedicineInventoryUsageModalComponent implements OnInit {
  readonly url = 'medicine-inventory-usages';
  title = '';
  isSubmitted = false;
  id = 0;
  inventoryUsageForm!: FormGroup;
  medicineInventoryId = 0;

  types = MEDICINE_USAGE_TYPE_ARRAY;

  constructor( 
    private fb: FormBuilder,
    private formService : FormService,
    private toastrService: ToastrService,
    public bsModalRef: BsModalRef 
  ) {}

  ngOnInit(): void {
    this.inventoryUsageForm = this.fb.group({
      medicine_inventory_id : ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [''],
    });

    this.inventoryUsageForm.controls['medicine_inventory_id'].setValue(this.medicineInventoryId);

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      if(response['data']) {
        this.inventoryUsageForm.patchValue(response['data']);
      }
    });
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
