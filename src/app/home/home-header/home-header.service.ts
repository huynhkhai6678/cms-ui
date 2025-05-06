import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";

@Injectable()
export class ProfileService {
    url = 'profile';

    constructor(
        private apiService: ApiService
    ) { }

    updateLanguage(language: string) {
        return this.apiService.post(`${this.url}/update-language`, {
            language,
        });
    }

    updateTheme(dark_mode: boolean) {
        return this.apiService.post(`${this.url}/update-theme`, {
            dark_mode,
        });
    }
}