import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private apiService: ApiService) {}

  getInitData(url: string) {
    return this.apiService.get(url);
  }
}