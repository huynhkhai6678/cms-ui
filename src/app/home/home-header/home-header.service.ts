import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class ProfileService {
    url = 'profile';

    constructor(
        private apiService: ApiService
    ) { }

    updateLanguage(language: string) {
        let body = {
            language,
        }
        return this.apiService.post(`${this.url}/update-language`, body);
    }

    updateTheme(dark_mode: boolean) {
        let body = {
            dark_mode,
        }
        return this.apiService.post(`${this.url}/update-theme`, body);
    }
}