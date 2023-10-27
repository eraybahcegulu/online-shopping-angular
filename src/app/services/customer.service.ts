import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers`);
  }

  addCustomer(customerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCustomer`, customerData);
  }
}
