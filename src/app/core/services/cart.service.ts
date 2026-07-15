import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CartRequest } from '../../model/cart-request';
import { CartResponse } from '../../model/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private  apiUrl = 'https://cartlane-backend-production-170d.up.railway.app/api/cart';;

  constructor(private http: HttpClient) { }

  /**
   * Add Product To Cart
   */
  addToCart(request: CartRequest): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.apiUrl, request);
  }

  /**
   * Get Customer Cart
   */
  getCart(customerId: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(
      `${this.apiUrl}/${customerId}`
    );
  }

  /**
   * Remove Cart Item
   */
  removeCartItem(cartItemId: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/item/${cartItemId}`,
      {
        responseType: 'text'
      }
    );
  }

  /**
   * Clear Cart
   */
  clearCart(customerId: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/clear/${customerId}`,
      {
        responseType: 'text'
      }
    );
  }

}