import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../../model/login-request';
import { RegisterRequest } from '../../model/register-request';
import { LoginResponse } from 'src/app/model/login-response';
import { ChangePasswordRequest } from 'src/app/model/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

 url = 'https://cartlane-backend-production-170d.up.railway.app';

  register(user: RegisterRequest): Observable<string> {
  return this.http.post(this.url + '/api/auth/register', user, {
    responseType: 'text'
  });
}

  
 login(user: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
      this.url + '/api/auth/login',
      user
  );
}
logout(): Observable<string> {

  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('customerId');
  localStorage.removeItem('role');
  

  return this.http.post(
    this.url + '/api/auth/logout',
    {},
    {
      responseType: 'text'
    }
  );
}
changePassword(request: ChangePasswordRequest): Observable<string> {

  return this.http.post(
    this.url + '/api/auth/change-password',
    request,
    {
      responseType: 'text'
    }
  );

}


}