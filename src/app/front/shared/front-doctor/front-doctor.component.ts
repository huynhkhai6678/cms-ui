import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-front-doctor',
  imports: [
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './front-doctor.component.html',
  styleUrl: './front-doctor.component.scss'
})
export class FrontDoctorComponent {
  @Input() doctors : FrontDoctor[] = [];
}

export interface FrontDoctor {
  name : number;
  avatar : number;
  specialization : number;
}