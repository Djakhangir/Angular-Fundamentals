import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding-left:10px; }
  `]
})
export class LoginComponent implements OnInit {
username;
password;
mouseroverLogin;
loginInvalid = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(formValues) {
   this.authService.loginUser(formValues.userName, formValues.password).subscribe(res => {
     if (!res) {
        this.loginInvalid = true;
     } else {
      this.router.navigate(['events']);
     }
   });

  }

  cancel() {
    this.router.navigate(['events']);
  }
}
