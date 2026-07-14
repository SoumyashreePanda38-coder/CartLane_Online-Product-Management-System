import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InvoiceRequest } from 'src/app/model/invoice-request';
import { InvoiceResponse } from 'src/app/model/invoice-response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://localhost:8080/api/invoices';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create Invoice
   */
  createInvoice(request: InvoiceRequest): Observable<InvoiceResponse> {

    return this.http.post<InvoiceResponse>(
      this.apiUrl,
      request
    );

  }

  /**
   * Get Invoice By Invoice ID
   */
  getInvoiceById(invoiceId: number): Observable<InvoiceResponse> {

    return this.http.get<InvoiceResponse>(
      `${this.apiUrl}/${invoiceId}`
    );

  }

  /**
   * Get Invoice By Order ID
   */
  getInvoiceByOrderId(orderId: number): Observable<InvoiceResponse> {

    return this.http.get<InvoiceResponse>(
      `${this.apiUrl}/order/${orderId}`
    );

  }

  /**
   * Delete Invoice
   */
  deleteInvoice(invoiceId: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${invoiceId}`,
      {
        responseType: 'text'
      }
    );

  }

}