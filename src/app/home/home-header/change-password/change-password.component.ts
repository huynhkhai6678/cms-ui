import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  isSubmitted : boolean = false;
  showCurrentPassword : boolean = false;
  showNewPassword : boolean = false;
  showComfirmPassword: boolean = false;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {

  }

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
      return false;
    }

    return true;
    //to do



  }
  
}
