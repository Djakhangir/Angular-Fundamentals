import { AuthService } from './user/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'events-app',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>
  `
})
export class EventsAppComponent implements OnInit {
  title = 'ng-fundamentals';

  // to get a hold on authentication meaning to keep the current user
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuthenticationStatius();
  }
}
