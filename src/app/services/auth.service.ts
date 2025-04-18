import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    readonly ADMIN_TYPE = 1;
    readonly DOCTOR_TYPE = 2;
    readonly SUPER_ADMIN_TYPE = 5;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private router: Router
    ) {}

    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    getUser(): any | null {
        let user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    isSuperAdmin(): boolean {
        let user = this.getUser();
        if (user) {
            return user.type == this.SUPER_ADMIN_TYPE;
        } 
        return false;
    }

    isAdmin(): boolean {
        let user = this.getUser();
        if (user) {
            return user.type == this.ADMIN_TYPE;
        } 
        return false;
    }

    isDoctor(): boolean {
        let user = this.getUser();
        if (user) {
            return user.type == this.DOCTOR_TYPE;
        } 
        return false;
    }

    saveToken(token: string): void {
        localStorage.setItem('jwtToken', token);
    }

    saveUser(user: object): void {
        localStorage.setItem('user', JSON.stringify(user));    
    }

    login(data : any) {
        return this.apiService.post('/auth/login', data);
    }

    logout(): void {
        localStorage.clear();
        // Redirect to login
        this.router.navigate(['login']);
    }
}