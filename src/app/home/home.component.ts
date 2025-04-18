import { Component } from '@angular/core';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeSidebarComponent } from './home-sidebar/home-sidebar.component';
import { HomeFooterComponent } from "./home-footer/home-footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeaderComponent,
    HomeSidebarComponent,
    HomeFooterComponent,
    RouterModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
