import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  emailSubcribe = '';
  errorEmail = false;
  showMessage = false;
  
  subscribe() {
    const re = /\S+@\S+\.\S+/;
    if(!re.test(this.emailSubcribe)) {
      this.errorEmail = true;
      return;
    }
    this.errorEmail = false;
    this.frontService.sendSubscribe({ email : this.emailSubcribe, 'clinic_id' : this.setting().clinic_id }).subscribe(() => {
      this.errorEmail = false;
      this.showMessage = true;
      this.emailSubcribe = '';

      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    });
  }
}
