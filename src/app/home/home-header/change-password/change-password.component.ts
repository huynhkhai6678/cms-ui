import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm! : FormGroup
  isSubmitted = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showComfirmPassword = false;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.apiService.post('profile/change-password', value).subscribe({
      next: (res : any) => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
        this.toastrService.success(res['message']);
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      }
    });
  }
  
}
