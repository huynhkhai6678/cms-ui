import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../transaction.model';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-label',
  imports: [],
  templateUrl: './transaction-label.component.html',
  styleUrl: './transaction-label.component.scss'
})
export class TransactionLabelComponent implements OnInit {
  url = 'transactions'
  services = signal<TransactionService[]>([]);
  patient = signal<any>({});

  constructor(private apiService: ApiService, private activedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getData(params['id']);
      }
    });
  }

  getData(id: number) {
    this.apiService.get(`${this.url}/get-services/${id}`).subscribe((res : any) => {
      this.services.set(res['data']['services']);
      this.patient.set(res['data']['patient']);
    });
  }
}
