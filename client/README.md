# OnlineShopping Angular-MongoDB AngularMaterial

- terminal1 npm run server
- terminal2 npm run start

```
*****************************************
if (token) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/user-info`, { headers });
} 
*****************************************
Bearer token > Front-end HTTP isteği ile kimlik doğrulama bilgileri back-end ile paylaşılır.
"Authorization" başlığını kullanır
```

```
@Output() productAdded = new EventEmitter<any>();
<app-customer-bar [productAdded]="productAdded"></app-customer-bar>
  @Input() set productAdded(productAdded: any) {
    productAdded.subscribe(() => {
      this.updateCartTotalItems();
    });
  }


@Output() productRemoved = new EventEmitter<any>();
<app-customer-bar [productRemoved]="productRemoved"></app-customer-bar>
  @Input() set productRemoved(productRemoved: any) {
    productRemoved.subscribe(() => {
      this.updateCartTotalItems();
    });
  }
```