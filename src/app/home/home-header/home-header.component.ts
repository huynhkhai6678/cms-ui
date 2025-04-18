import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [
    BsDropdownModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent implements OnInit {
  headerRoutes = signal<any[]>([]);
  darkMode = signal<boolean>(false);
  iconClass = computed(() => {
    if (this.darkMode()) {
      return 'fa-sun';
    }
    return 'fa-moon';
  });

  readonly allHeaderRoutes = {
    'clinics': [
      {
        name : 'Clinics',
        link: 'clinics'
      }
    ],
    'clinic-chains': [
      {
        name : 'Chains',
        link: 'clinic-chains'
      }
    ],
    'users': [
      {
        name : 'Users',
        link: 'users'
      }
    ]
  }

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.setRouter(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event:NavigationStart) => {      
      this.setRouter(event.url);
    });
  }

  setRouter(url: string) {
    for (const [key, value] of Object.entries(this.allHeaderRoutes)) {
      if (url.indexOf(key) >= 0) {
        this.headerRoutes.set(value);
        return;
      }
    }
  }

  toggleTheme() {
    const light = document.getElementById('light-theme') as HTMLLinkElement;
    const dark = document.getElementById('dark-theme') as HTMLLinkElement;

    this.darkMode.update(value => !value);
    
    if (this.darkMode()) {
      dark.disabled = false;
      light.disabled = true;
    } else {
      dark.disabled = true;
      light.disabled = false;
    }
  }
}
