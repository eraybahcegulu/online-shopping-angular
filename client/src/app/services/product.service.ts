import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, productData);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiUrl}/deleteProduct/${productId}`);
  }

  updateProduct(productId: string, updatedProductData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProduct/${productId}`, updatedProductData);
  }

  addProductType(productTypeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProductType`, productTypeData);
  }

  getProductTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productTypes`);
  }

  deleteProductType(productTypeId: string) {
    return this.http.delete(`${this.apiUrl}/deleteProductType/${productTypeId}`);
  }

  updateProductType(productTypeId: string, updatedProductTypeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProductType/${productTypeId}`, updatedProductTypeData);
  }

  addedCart(productId: string) {
    return this.http.delete(`${this.apiUrl}/addedCart/${productId}`);
  }
  
}