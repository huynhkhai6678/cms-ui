import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  showAlert : boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
    private translateServie: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.themeService.initLoginTheme();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(value : any, valid : boolean) {
    this.showAlert = false;
    if (!valid) {
      return;
    }

    this.authService.login(value).subscribe({
      next : (res: any) => {
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.data);
        this.authService.savePermission(res.permissions);
        this.translateServie.use(res.data.language);
        
        if (this.authService.isSuperAdmin()) {
          return this.router.navigate(['home/clinics']);
        }
        return this.router.navigate(['home']);
      },
      error: (error) => {
        this.showAlert = true;
      }
    });
  }
}
