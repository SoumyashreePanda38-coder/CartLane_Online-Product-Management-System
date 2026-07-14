import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdminDashboardResponse } from 'src/app/model/admin-dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private url = 'http://localhost:8080/api/admin/dashboard';

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<AdminDashboardResponse> {

    return this.http.get<AdminDashboardResponse>(this.url);

  }

}