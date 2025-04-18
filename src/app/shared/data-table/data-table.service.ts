import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";

@Injectable({
    providedIn: 'root'
})

export class DataTableService {
    constructor(
        private apiService: ApiService,
    ) {

    }

    get(url: string) {
        return this.apiService.get(url);
    }
}