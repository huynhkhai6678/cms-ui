import { Component, OnInit, Signal } from '@angular/core';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeSidebarComponent } from './home-sidebar/home-sidebar.component';
import { HomeFooterComponent } from "./home-footer/home-footer.component";
import { RouterModule } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { HomeService } from './home.service';
import { AuthService } from '../services/auth.service';

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
export class HomeComponent implements OnInit {
  collapse! : Signal<boolean>;

  constructor(private themeService: ThemeService, private homeService: HomeService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.themeService.changeTheme(user.dark_mode);
    }
    this.collapse = this.homeService.collapseSider;

    this.homeService.getClinics();
  }
}
