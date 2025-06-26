import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';
import { Enquiry } from '../enquiry.model';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';

@Component({
  selector: 'app-enquiry-modal',
  imports: [
    TranslatePipe,
    DiffForHumansPipe
  ],
  templateUrl: './enquiry-modal.component.html',
  styleUrl: './enquiry-modal.component.scss'
})
export class EnquiryModalComponent implements OnInit {
  id = 0;
  enquiry?: Enquiry;

  readonly bsModalRef = inject(BsModalRef);
  readonly apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.get(`enquiries/${this.id}`).subscribe((res : any) => {
      this.enquiry = res['data'];
    });
  }
}
