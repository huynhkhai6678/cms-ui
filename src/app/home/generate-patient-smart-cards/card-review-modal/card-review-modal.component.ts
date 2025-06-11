import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card-review-modal',
  imports: [
    TranslatePipe
  ],
  templateUrl: './card-review-modal.component.html',
  styleUrl: './card-review-modal.component.scss'
})
export class CardReviewModalComponent implements OnInit {
  apiUrl = environment.apiUrl;
  data! : any;
  id = 0;

  clinicName = '';
  addressOne = '';
  logo = '';
  patientAddress = '';
  qrCodeSvg: SafeHtml = '';

  constructor(
    private apiService : ApiService,
    private sanitizer: DomSanitizer,
    public bsModalRef: BsModalRef,
  ) {}

  ngOnInit(): void {
    this.apiService.get(`smart-patient-cards/show/${this.id}`).subscribe((res : any) => {
      this.data = res['data'];
      this.clinicName = res['clinic_name'];
      this.addressOne = res['address_one'];
      this.logo = res['logo'];
      this.patientAddress = res['patient_address'];
      this.qrCodeSvg = this.sanitizer.bypassSecurityTrustHtml(res.svg);
    });
  }

}
