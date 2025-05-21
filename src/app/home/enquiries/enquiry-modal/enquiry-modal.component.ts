import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';
import { Enquiry } from '../enquiry.model';
import moment from 'moment';

@Component({
  selector: 'app-enquiry-modal',
  imports: [
    TranslatePipe
  ],
  templateUrl: './enquiry-modal.component.html',
  styleUrl: './enquiry-modal.component.scss'
})
export class EnquiryModalComponent implements OnInit {
  id = 0;
  enquiry?: Enquiry;
  lastViewed = '';
  registerOn = '';

  constructor(public bsModalRef: BsModalRef, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get(`enquiries/${this.id}`).subscribe((res : any) => {
      this.enquiry = res['data'];
      this.lastViewed = moment(this.enquiry?.updated_at).fromNow();
      this.registerOn = moment(this.enquiry?.updated_at).fromNow();
    });
  }
}
