import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoryRequestModel } from 'src/app/model/category-request.model';
import { CategoryResponseModel } from 'src/app/model/category-response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  // Add Category
  addCategory(category: CategoryRequestModel): Observable<string> {

  return this.http.post(
    this.apiUrl,
    category,
    {
      responseType: 'text'
    }
  );

}

  // Get All Categories
  getAllCategories(): Observable<CategoryResponseModel[]> {
    return this.http.get<CategoryResponseModel[]>(this.apiUrl);
  }

  // Get Category By Id
  getCategoryById(id: number): Observable<CategoryResponseModel> {
    return this.http.get<CategoryResponseModel>(`${this.apiUrl}/${id}`);
  }

  // Update Category
  updateCategory(id: number, category: CategoryRequestModel): Observable<CategoryResponseModel> {
    return this.http.put<CategoryResponseModel>(`${this.apiUrl}/${id}`, category);
  }

  // Delete Category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Search Category
  searchCategory(keyword: string): Observable<CategoryResponseModel[]> {
    return this.http.get<CategoryResponseModel[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

}