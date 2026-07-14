import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomerIssueRequest } from 'src/app/model/customer-issue-request';
import { CustomerIssueResponse } from 'src/app/model/customer-issue-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerIssueService {

  private apiUrl = 'http://localhost:8080/api/customer-issues';

  constructor(private http: HttpClient) { }

  /**
   * Raise New Customer Issue
   */
  createIssue(request: CustomerIssueRequest): Observable<CustomerIssueResponse> {
    return this.http.post<CustomerIssueResponse>(this.apiUrl, request);
  }

  /**
   * Get All Customer Issues
   */
  getAllIssues(): Observable<CustomerIssueResponse[]> {
    return this.http.get<CustomerIssueResponse[]>(this.apiUrl);
  }

  /**
   * Get Issue By ID
   */
  getIssueById(issueId: number): Observable<CustomerIssueResponse> {
    return this.http.get<CustomerIssueResponse>(`${this.apiUrl}/${issueId}`);
  }

  /**
   * Get Issues By Customer ID
   */
  getIssuesByCustomer(customerId: number): Observable<CustomerIssueResponse[]> {
    return this.http.get<CustomerIssueResponse[]>(
      `${this.apiUrl}/customer/${customerId}`
    );
  }

  /**
   * Update Customer Issue
   */
  updateIssue(
    issueId: number,
    request: CustomerIssueRequest
  ): Observable<CustomerIssueResponse> {
    return this.http.put<CustomerIssueResponse>(
      `${this.apiUrl}/${issueId}`,
      request
    );
  }

  /**
   * Delete Customer Issue
   */
  deleteIssue(issueId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${issueId}`);
  }

  /**
   * Search Customer Issues
   */
  searchIssues(keyword: string): Observable<CustomerIssueResponse[]> {
    return this.http.get<CustomerIssueResponse[]>(
      `${this.apiUrl}/search?keyword=${keyword}`
    );
  }

}