import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
  collapseSider = signal<boolean>(false);

  updateCollapseSidebar() {
    this.collapseSider.set(!this.collapseSider());
  }
}