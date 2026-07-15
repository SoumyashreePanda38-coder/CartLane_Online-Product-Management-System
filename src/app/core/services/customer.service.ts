import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CustomerRequest } from 'src/app/model/customer-request';

import { CustomerResponse } from 'src/app/model/customer-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://cartlane-backend-production-170d.up.railway.app/api/customers';

  constructor(private http: HttpClient) { }

  /**
   * Add New Customer
   */
  addCustomer(customer: CustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(this.apiUrl, customer);
  }

  /**
   * Get All Customers
   */
  getAllCustomers(): Observable<CustomerResponse[]> {
    return this.http.get<CustomerResponse[]>(this.apiUrl);
  }

  /**
   * Get Customer By ID
   */
  getCustomerById(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update Customer
   */
 updateCustomer(id: number, request: CustomerRequest) {
    return this.http.put<CustomerResponse>(
        `${this.apiUrl}/${id}`,
        request
    );
}

  /**
   * Delete Customer
   */
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Search Customers
   */
  searchCustomers(keyword: string): Observable<CustomerResponse[]> {
    return this.http.get<CustomerResponse[]>(
      `${this.apiUrl}/search?keyword=${keyword}`
    );
  }

}