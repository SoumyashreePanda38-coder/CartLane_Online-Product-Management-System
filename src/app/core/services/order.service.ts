import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OrderRequest } from 'src/app/model/order-request';
import { OrderResponse } from 'src/app/model/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://cartlane-backend-production-170d.up.railway.app/api/orders';

  constructor(private http: HttpClient) { }

  // ==========================================
  // Create Order
  // ==========================================

  createOrder(request: OrderRequest): Observable<OrderResponse> {

    return this.http.post<OrderResponse>(
      this.apiUrl,
      request
    );

  }

  // ==========================================
  // Get All Orders
  // ==========================================

  getAllOrders(): Observable<OrderResponse[]> {

    return this.http.get<OrderResponse[]>(
      this.apiUrl
    );

  }

  // ==========================================
  // Get Order By ID
  // ==========================================

  getOrderById(orderId: number): Observable<OrderResponse> {

    return this.http.get<OrderResponse>(
      `${this.apiUrl}/${orderId}`
    );

  }

  // ==========================================
  // Get Orders By Customer
  // ==========================================

  getOrdersByCustomer(customerId: number): Observable<OrderResponse[]> {

    return this.http.get<OrderResponse[]>(
      `${this.apiUrl}/customer/${customerId}`
    );

  }

  // ==========================================
  // Update Order
  // ==========================================

  updateOrder(
    orderId: number,
    request: OrderRequest
  ): Observable<OrderResponse> {

    return this.http.put<OrderResponse>(
      `${this.apiUrl}/${orderId}`,
      request
    );

  }

  // ==========================================
  // Update Order Status
  // ==========================================

  updateOrderStatus(
    orderId: number,
    status: string
  ): Observable<OrderResponse> {

    return this.http.patch<OrderResponse>(
      `${this.apiUrl}/${orderId}/status?status=${status}`,
      {}
    );

  }

  // ==========================================
  // Get Orders By Status
  // ==========================================

  getOrdersByStatus(status: string): Observable<OrderResponse[]> {

    return this.http.get<OrderResponse[]>(
      `${this.apiUrl}/status?status=${status}`
    );

  }

  // ==========================================
  // Delete Order
  // ==========================================

  deleteOrder(orderId: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${orderId}`,
      {
        responseType: 'text'
      }
    );

  }

}