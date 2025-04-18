import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: "root"
})
export class FrontService {
    url = 'fronts';
    #setting = signal<any>({});
    setting = computed(this.#setting);

    constructor(
        private apiService: ApiService
    ) {

    }

    updateSignal(value: object) {
        this.#setting.set(value);
    }

    getClinicSetting(clinicName : string) {
        return this.apiService.get(`${this.url}/?name=${clinicName}`);
    }

    getClinicTestominal(clinicId : number) {
        return this.apiService.get(`${this.url}/testimonials/${clinicId}`);
    }

    getServiceCounter(clinicId : number) {
        return this.apiService.get(`${this.url}/service-counters/${clinicId}`);
    }

    getDoctor(clinicId : number) {
        return this.apiService.get(`${this.url}/doctors/${clinicId}`);
    }

    getTopDoctor(clinicId : number) {
        return this.apiService.get(`${this.url}/top-doctors/${clinicId}`);
    }

    getServices(clinicId : number) {
        return this.apiService.get(`${this.url}/services/${clinicId}`);
    }

    getFaqs(clinicId : number) {
        return this.apiService.get(`${this.url}/faqs/${clinicId}`);
    }

    getLanding(clinicId : number) {
        return this.apiService.get(`${this.url}/landing/${clinicId}`);
    }

    sendSubscribe(data : any) {
        let url = 'subscribes';
        return this.apiService.post(url, data);
    }

    sendEnquiry(data : any) {
        let url = 'enquiries';
        return this.apiService.post(url, data);
    }

}