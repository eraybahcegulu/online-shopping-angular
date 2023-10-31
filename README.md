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

![1](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/a5b9be5c-fc96-485e-bc8f-b6a1888c1fff)

![2](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/abcba9f3-f223-4d65-b475-c60eb10e759c)

![3](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/5078a156-965a-43ba-8392-dc66b9568cff)

![4](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/987c62de-ff11-4fb3-b77c-16775e39bd4c)

![5](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/19032c69-35b3-4352-8e8a-65050de5555a)

![6](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/58190cac-5419-4563-9d4f-5a5714e01570)

![7](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/0e755347-5879-4afd-b912-414bc4a5dbce)

![8](https://github.com/eraybahcegulu/online-shopping-angular-mongodb/assets/84785201/7eb9991e-4e16-41f9-afd9-2a5810541c0b)
