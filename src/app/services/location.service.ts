import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private apiService: ApiService) {}

  getCountries() {
    return this.apiService.get('helper/countries');
  }

  getStatesByCountry(countryId: number) {
    return this.apiService.get(`helper/states-by-country/${countryId}`);
  }

  getCitiesByState(stateId: number) {
    return this.apiService.get(`helper/cities-by-state/${stateId}`);
  }
}

export interface Country {
    id: number;
    name: string;
    phone_code: string;
    short_code: string;
}

export interface State {
    country_id: number;
    id: number;
    name: string;
}

export interface City {
    state_id: number;
    id: number;
    name: string;
}