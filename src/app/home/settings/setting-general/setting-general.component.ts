import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2 } from 'ng-select2-component';
import { HomeService } from '../../home.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { PhoneInputComponent } from '../../../shared/phone-input/phone-input.component';
import { ApiService } from '../../../services/api.service';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting-general',
  imports: [
    Select2,
    PhoneInputComponent,
    ImageUploadComponent,
    FormsModule,
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './setting-general.component.html',
  styleUrl: './setting-general.component.scss'
})
export class SettingGeneralComponent implements OnInit {
  url = 'settings/general';
  clinicId = 0;
  generalForm! : FormGroup;
  isSubmitted = false;

  specializations = [];
  currencies = [];
  payments = [];

  readonly LANGUAGES = [
    { label: 'English', value: 'en'},
    { label: '中文', value: 'zh'},
    { label: 'Bahasa', value: 'id'},
    { label: 'ភាសាខ្មែរ', value: 'km'},
  ]

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    public homeService : HomeService,
    private toastr : ToastrService, 
  ) {
    this.clinicId = this.authService.getUser().clinic_id;
  }

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      clinic_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: [''],
      specialities : [[], [Validators.required]],
      front_color : ['', [Validators.required]],
      logo: [''],
      favicon: [''],
      currency : [''],
      language : [''],
      payment_gateways : [[]]
    });
  }

  loadData() {
    this.apiService.get(`${this.url}/${this.clinicId}`).subscribe((res : any) => {
      this.specializations = res['specializations'];
      this.currencies = res['currencies'];
      this.payments = res['payments'];

      // Select 2 not working well with form need set timout here
      setTimeout(() => {
        this.generalForm.patchValue(res['data']);
      }, 100)
    });
  }

  onGatewayChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const payementId = Number(input.value);
    const permissionArray: number[] = this.generalForm.value.payment_gateways;
  
    if (input.checked) {
      if (!permissionArray.includes(payementId)) {
        permissionArray.push(payementId);
      }
    } else {
      const index = permissionArray.indexOf(payementId);
      if (index >= 0) {
        permissionArray.splice(index, 1);
      }
    }
  
    this.generalForm.controls['payment_gateways'].setValue(permissionArray);
  }

  submit(value : any, valid: boolean) {
    if(!valid) return;
    this.isSubmitted = true;
    this.apiService.post(`${this.url}/${this.clinicId}`, value).subscribe((res: any) => {
      this.isSubmitted = false;
      this.toastr.success(res['message']);
    });
  }
}
