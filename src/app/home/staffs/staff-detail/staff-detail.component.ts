import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { ShareService } from '../../../services/share.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormService } from '../../../services/form.service';
import { StaffModalComponent } from '../staff-modal/staff-modal.component';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';
import { Location } from '@angular/common';

@Component({
  selector: 'app-staff-detail',
  imports: [
    TabsModule,
    TranslatePipe,
    DiffForHumansPipe
  ],
  templateUrl: './staff-detail.component.html',
  styleUrl: './staff-detail.component.scss'
})
export class StaffDetailComponent implements OnInit {
  id = 0;
  data : any = null;
  GENDER : Record<string, any> = {};

  location = inject(Location);
  activeRoute = inject(ActivatedRoute);
  apiService = inject(ApiService);
  shareService = inject(ShareService);
  formService = inject(FormService);
  
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

  goBack() {
    this.location.back();
  }
}
