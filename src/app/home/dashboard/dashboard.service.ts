import { computed, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    #earningThisMonth = signal<number>(0);
    earningThisMonth = computed(this.#earningThisMonth);
    #earningLastMonth = signal<number>(0);
    earningLastMonth = computed(this.#earningLastMonth);

    updateEarningThisMonth(value : number) {
        this.#earningThisMonth.set(value);
    }

    updateEarningLastMonth(value : number) {
        this.#earningLastMonth.set(value);
    }
}