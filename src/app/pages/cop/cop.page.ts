import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cop',
  templateUrl: './cop.page.html',
  styleUrls: ['./cop.page.scss'],
})
export class CopPage {
  constructor(private router: Router) {}

  selectRole(role: string) {
    if (role === 'conductor') {
      this.router.navigate(['/conductor']);
    } else if (role === 'pasajero') {
      this.router.navigate(['/pasajero']);
    }
  }
}
