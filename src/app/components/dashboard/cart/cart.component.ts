import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  userInfo: any;
  products: any;
  cartTotalItems: number = 0;

  @Output() productAdded = new EventEmitter<any>();
  constructor(private authService: AuthService, private productService: ProductService, private router: Router) { }

  logout(): void {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      }
    );

    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products;
    });
  }

}