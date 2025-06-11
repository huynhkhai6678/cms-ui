import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-patient-medical-record',
  imports: [
    RouterLink,
    TranslatePipe,
    TabsModule
  ],
  templateUrl: './patient-medical-record.component.html',
  styleUrl: './patient-medical-record.component.scss'
})
export class PatientMedicalRecordComponent implements OnInit {
  apiUrl = environment.apiUrl;
  data : any = null;

  constructor(
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params : any) => {
      const id = params['id'];
      this.apiService.get(`patient-medical-record/${id}`).subscribe((res : any) => {
        this.data = res['data'];
      });
    });
  }
}
