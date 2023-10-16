import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    register(email: string, password: string): Observable<any> {
        const payload = { email, password };
        return this.http.post(`${this.apiUrl}/register`, payload);
    }


}
