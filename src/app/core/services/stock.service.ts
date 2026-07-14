import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StockRequest } from 'src/app/model/stock-request';
import { StockResponse } from 'src/app/model/stock-response';
import { StockHistoryResponse } from 'src/app/model/stock-history-response';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:8080/api/stocks';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get All Stocks
   */
  getAllStocks(): Observable<StockResponse[]> {
    return this.http.get<StockResponse[]>(this.apiUrl);
  }

  /**
   * Get Stock By Stock Id
   */
  getStockById(stockId: number): Observable<StockResponse> {
    return this.http.get<StockResponse>(
      `${this.apiUrl}/${stockId}`
    );
  }

  /**
   * Get Stock By Product Id
   */
  getStockByProductId(id: number): Observable<StockResponse> {
    return this.http.get<StockResponse>(
      `${this.apiUrl}/product/${id}`
    );
  }

  /**
   * Add Stock
   */
  addStock(request: StockRequest): Observable<StockResponse> {
    return this.http.post<StockResponse>(
      this.apiUrl,
      request
    );
  }

  /**
   * Update Stock
   */
  updateStock(
    stockId: number,
    request: StockRequest
  ): Observable<StockResponse> {

    return this.http.put<StockResponse>(
      `${this.apiUrl}/${stockId}`,
      request
    );
  }

  /**
   * Delete Stock
   */
  deleteStock(stockId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${stockId}`
    );
  }

  /**
   * Get Stock History
   */
  getStockHistory(id: number): Observable<StockHistoryResponse[]> {
    return this.http.get<StockHistoryResponse[]>(
      `${this.apiUrl}/history/${id}`
    );
  }

}