import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userInfo: any;
  products: any;
  cartTotalItems: number = 0;
  message: string = '';
  messageType: string = '';

  constructor(private authService: AuthService, private productService: ProductService, private cartService: CartService) { }

  logout(): void {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;

        if (this.userInfo) {
          this.cartService.getCartTotalItems(this.userInfo._id).subscribe(
            (totalItems: number) => {
              this.cartTotalItems = totalItems;
              console.log(this.cartTotalItems);
            }
          );
        }
      }
    );

    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products;
    });
  }

  updateCartTotalItems() {

    this.cartService.getCartTotalItems(this.userInfo._id).subscribe(
      (totalItems: number) => {
        this.cartTotalItems = totalItems;
        console.log(this.cartTotalItems);
      }
    );
  }

  addCart(product: any) {

    product.isAddingToCart = true;

    const cartData = {
      customer_id: this.userInfo._id,
      product_id: product._id,
      product_name: product.name,
      product_type: product.type,
      product_description: product.description,
      product_price: product.price
    };

    this.cartService.addCart(cartData).subscribe(
      (response) => {
        setTimeout(() => {
          product.isAddingToCart = false;
          product.isAddedToCart = true;

          setTimeout(() => {
            product.isAddedToCart = false;
          }, 2000);
          setTimeout(() => {
            product.isDisabled = false;
          }, 2000);

          if (product.quantity === 0) {
            product.isDisabled = true;
          }

          if (product.isAddedToCart) {
            this.handleAddCartResponse(product, response);
            this.updateCartTotalItems();
            if (product.quantity > 0) {
              product.quantity -= 1;
            }

            const productId = product._id;

            this.productService.addedCart(productId).subscribe(

            )
          }
        }, 2000);
      },
      (error) => {
        this.handleAddCartError(product, error);
        product.isAddingToCart = false;
        product.isAddedToCart = false;
      }
    );

  }

  private handleAddCartResponse(product: any, response: any): void {
    product.message = response.message;
    product.messageType = 'success';
    setTimeout(() => {
      product.message = '';
      product.messageType = '';
    }, 2000);
  }

  private handleAddCartError(product: any, error: HttpErrorResponse): void {
    if (error.status === 400) {
      product.message = error.error.message;
      product.messageType = 'danger';
    } else {
      console.error('Registration failed', error);
    }
    setTimeout(() => {
      product.message = '';
      product.messageType = '';
    }, 2000);
  }
}