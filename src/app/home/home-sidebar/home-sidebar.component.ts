import { Component, computed, model, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './home-sidebar.component.html',
  styleUrl: './home-sidebar.component.scss'
})
export class HomeSidebarComponent implements OnInit {
  routes = signal<HomeSidebarLink[]>([]);
  search = model<string>('');
  filteredRoutes = computed(() =>
    this.routes().filter(s => {
      return s.name.toLowerCase().includes(this.search().toLowerCase())
    })
  );

  readonly superAdminRoutes : HomeSidebarLink[] = [
    {
      icon : 'fa-solid fa-calendar',
      name : 'Clinics',
      link: 'clinics'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'Chains',
      link: 'clinic-chains'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'Users',
      link: 'users'
    }
  ];

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    let user : any = this.authService.getUser();
    if (!user) {
      return;
    }

    switch(user.type) {
      case 5:
        this.routes.set(this.superAdminRoutes);
        break;
      case 1:
        break;
      default:
        return;
    }
  }
}

export interface HomeSidebarLink {
  icon: string;
  name: string;
  link: string;
}
