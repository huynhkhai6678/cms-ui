import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { ShareService } from '../../../services/share.service';
import moment from 'moment';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormService } from '../../../services/form.service';
import { StaffModalComponent } from '../staff-modal/staff-modal.component';

@Component({
  selector: 'app-staff-detail',
  imports: [
    TabsModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './staff-detail.component.html',
  styleUrl: './staff-detail.component.scss'
})
export class StaffDetailComponent implements OnInit {
  id = 0;
  data : any = null;
  registeredOn = '';
  lastUpdated = '';
  GENDER : Record<string, any> = {}

  constructor(private activeRoute : ActivatedRoute, private apiService : ApiService, public shareService : ShareService, private formService : FormService) {}
  
  ngOnInit(): void {
    this.GENDER = this.shareService.GENDER;
    
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadData();
    });
  }

  loadData() {
    this.apiService.get(`staffs/detail/${this.id}`).subscribe((res : any) => {
      this.data = res['data'];
      this.registeredOn = moment(this.data.register_on).fromNow();
      this.lastUpdated = moment(this.data.last_update).fromNow();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(StaffModalComponent, 'modal-lg', {
      title: 'messages.staff.edit_staff',
      id,
    }, () => {
      this.loadData();
    });
  }
}
