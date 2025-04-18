import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontService } from '../front.service';
import { TranslatePipe } from '@ngx-translate/core';
import {  FormsModule } from '@angular/forms';

@Component({
  selector: 'app-front-footer',
  imports: [
    RouterModule,
    CommonModule,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './front-footer.component.html',
  styleUrl: './front-footer.component.scss'
})
export class FrontFooterComponent {
  frontService = inject(FrontService);
  setting = this.frontService.setting;
  emailSubcribe : string = '';
  errorEmail : boolean = false;
  showMessage : boolean = false;
  
  subscribe() {
    let re = /\S+@\S+\.\S+/;
    if(!re.test(this.emailSubcribe)) {
      this.errorEmail = true;
      return;
    }
    this.errorEmail = false;
    this.frontService.sendSubscribe({ email : this.emailSubcribe, 'clinic_id' : this.setting().clinic_id }).subscribe(res => {
      this.errorEmail = false;
      this.showMessage = true;
      this.emailSubcribe = '';

      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    });
  }
}
