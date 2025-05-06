import { Component, OnInit, Signal } from '@angular/core';
import { FrontService } from '../front.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HeroSectionComponent } from '../shared/hero-section/hero-section.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-medical-contact',
  standalone: true,
  imports: [
    TranslatePipe,
    HeroSectionComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './medical-contact.component.html',
  styleUrl: './medical-contact.component.scss'
})
export class MedicalContactComponent implements OnInit {
  data! : Signal<any>;
  enquiryForm! : FormGroup;
  isSubmitted = false;

  constructor(
    private frontService : FrontService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.data = this.frontService.setting;
    this.enquiryForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      subject: ['', [Validators.required, Validators.maxLength(121)]],
      message: ['', [Validators.required]]
    });
  }

  sendEnquiry(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    value.clinic_id = this.data().clinic_id;
    this.frontService.sendEnquiry(value).subscribe(() => {
      this.isSubmitted = false;
      this.enquiryForm.reset();
    });
  }
}
