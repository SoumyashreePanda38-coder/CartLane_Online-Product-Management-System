import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OrderItemRequest } from 'src/app/model/order-item-request';
import { OrderItemResponse } from 'src/app/model/order-item-response';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private apiUrl = 'https://cartlane-backend-production-170d.up.railway.app/api/order-items';

  constructor(private http: HttpClient) { }

  // Create Order Item
  createOrderItem(request: OrderItemRequest): Observable<OrderItemResponse> {

    return this.http.post<OrderItemResponse>(
      this.apiUrl,
      request
    );

  }

  // Get All Order Items
  getAllOrderItems(): Observable<OrderItemResponse[]> {

    return this.http.get<OrderItemResponse[]>(
      this.apiUrl
    );

  }

  // Get Order Item By Id
  getOrderItemById(orderItemId: number): Observable<OrderItemResponse> {

    return this.http.get<OrderItemResponse>(
      `${this.apiUrl}/${orderItemId}`
    );

  }

  // Get Items Of Order
  getOrderItemsByOrder(orderId: number): Observable<OrderItemResponse[]> {

    return this.http.get<OrderItemResponse[]>(
      `${this.apiUrl}/order/${orderId}`
    );

  }

  // Get Items Of Product
  getOrderItemsByProduct(productId: number): Observable<OrderItemResponse[]> {

    return this.http.get<OrderItemResponse[]>(
      `${this.apiUrl}/product/${productId}`
    );

  }

  // Update Order Item
  updateOrderItem(
    orderItemId: number,
    request: OrderItemRequest
  ): Observable<OrderItemResponse> {

    return this.http.put<OrderItemResponse>(
      `${this.apiUrl}/${orderItemId}`,
      request
    );

  }

  // Delete Order Item
  deleteOrderItem(orderItemId: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${orderItemId}`,
      {
        responseType: 'text'
      }
    );

  }

}