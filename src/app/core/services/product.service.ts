import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductRequest } from '../../model/product-request';
import { ProductResponse } from '../../model/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Spring Boot Base URL
  private apiUrl = 'https://cartlane-backend-production-170d.up.railway.app/api/products';

  constructor(private http: HttpClient) { }

  /**
   * Add New Product
   */
  addProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, product);
  }

  /**
   * Get All Products
   */
  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl);
  }

  /**
   * Get Product By ID
   */
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update Product
   */
  updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, product);
  }

  /**
   * Delete Product
   */
  deleteProduct(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }

  /**
   * Search Products
   */
  /**
 * Search Products
 */
searchProducts(keyword: string): Observable<ProductResponse[]> {


  const params = new HttpParams()
    .set('keyword', keyword);



  return this.http.get<ProductResponse[]>(
    `${this.apiUrl}/search`,
    {
      params
    }
  );


}

  /**
   * Get Products by Category
   */
  getProductsByCategory(categoryId: number): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.apiUrl}/category/${categoryId}`
    );
  }

  /**
   * Get Products by Pagination
   */
  getProductsByPage(
    page: number,
    size: number,
    sortBy: string = 'createdAt',
    direction: string = 'desc'
  ): Observable<any> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<any>(`${this.apiUrl}/page`, { params });
  }

}