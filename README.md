# OnlineShopping Angular-MongoDB

- terminal1 npm run server
- terminal2 npm run start

```
*****************************************
        if (token) {
          const headers = { Authorization: `Bearer ${token}` };
          return this.http.get(`${this.apiUrl}/user-info`, { headers });
        } 
*****************************************
    Bearer token > Front-end HTTP isteği ile kimlik doğrulama bilgileri back-end ile paylaşılır. "Authorization" başlığını kullanır
```