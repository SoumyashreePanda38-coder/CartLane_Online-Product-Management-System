import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRequest } from 'src/app/model/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginRequest: LoginRequest = new LoginRequest();

  constructor(private authService: AuthService, private router: Router) { }

  login() {

  console.log(this.loginRequest);

  this.authService.login(this.loginRequest).subscribe({

    next: (response) => {

      console.log(response);

      localStorage.setItem('userId', response.userId.toString());
      localStorage.setItem(
  'username',
  response.username
);

      if (response.customerId != null) {
        localStorage.setItem(
          'customerId',
          response.customerId.toString()
        );
      } else {
        localStorage.removeItem('customerId');
      }

      localStorage.setItem('role', response.role);

      alert(response.message);

      if (response.role === 'ADMIN') {

        this.router.navigate(['/admin/dashboard']);

      }
      else if (response.role === 'CUSTOMER') {

        this.router.navigate(['/customer/dashboard']);

      }
      else {

        alert("Unknown Role");

      }

    },

    error: (err) => {

      console.log(err);

      alert("Invalid Username or Password");

    }

  });

}

}

