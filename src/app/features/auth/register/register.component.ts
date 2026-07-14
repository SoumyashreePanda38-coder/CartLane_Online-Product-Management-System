import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterRequest } from 'src/app/model/register-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  passwordLength:boolean = false;

hasUppercase:boolean = false;

hasNumber:boolean = false;

hasSpecial:boolean = false;

  registerRequest: RegisterRequest = new RegisterRequest();

  constructor(private authService: AuthService, private router: Router) { }

  selectRole(role: string) {
    this.registerRequest.role = role;
  }

 register() {

  console.log(this.registerRequest);
   

  this.authService.register(this.registerRequest).subscribe({

    next: (response) => {
      alert(response);
      console.log(response);
      this.router.navigate(['/login']);
    },

    error: (error) => {
      console.log(this.registerRequest);
      console.log(error);
      alert("Registration Failed");
    }

  });

}
checkPassword(){


  const password =
  this.registerRequest.password;



  this.passwordLength =
  password.length >= 8;



  this.hasUppercase =
  /[A-Z]/.test(password);



  this.hasNumber =
  /[0-9]/.test(password);



  this.hasSpecial =
  /[!@#$%^&*(),.?":{}|<>]/.test(password);


}

}