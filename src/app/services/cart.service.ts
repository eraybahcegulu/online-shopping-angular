import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addCart(cartData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCart`, cartData);
  }

  getCartTotalItems(customerId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getCartTotalItems/${customerId}`);
  }
  
  getCartProducts(customerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getCartProducts/${customerId}`);
  }

  removeCart(cartData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/removeCart`, cartData);
  }
}