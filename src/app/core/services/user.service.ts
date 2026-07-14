import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserRequest } from 'src/app/model/user-request';
import { UserResponse } from 'src/app/model/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /**
   * Get all users
   */
  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      this.url + '/api/users'
    );
  }

  /**
   * Get user by ID
   */
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      this.url + '/api/users/' + id
    );
  }

  /**
   * Update user profile
   */
  updateUser(id: number, request: UserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      this.url + '/api/users/' + id,
      request
    );
  }

  /**
   * Create user
   */
  createUser(request: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      this.url + '/api/users',
      request
    );
  }

  /**
   * Delete user
   */
  deleteUser(id: number): Observable<string> {
    return this.http.delete(
      this.url + '/api/users/' + id,
      {
        responseType: 'text'
      }
    );
  }

}