import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  userInfo: any;
  cartProducts: any;
  totalPrice: number = 0;
  @Output() productRemoved = new EventEmitter<any>();
  constructor(private authService: AuthService, private cartService: CartService) { }

  logout(): void {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
  
        if (this.userInfo) {
          this.cartService.getCartProducts(this.userInfo._id).subscribe(
            (cartProducts: any) => {
              this.cartProducts = cartProducts;
              console.log(this.cartProducts);
              this.totalPrice = this.cartProducts.reduce((total: number, product: any) => total + product.product_price, 0);
            }
          );
        }
      }
    );
  }

  removeCart(product: any){
    const cartData ={
      _id: product._id,
      product_id: product.product_id
    };
    this.cartService.removeCart(cartData).subscribe(() => {
      this.productRemoved.emit(product);
      this.loadCart();
    });
  }

  loadCart() {
    this.cartService.getCartProducts(this.userInfo._id).subscribe(
      (data) => {
        this.cartProducts = data;
        this.totalPrice = this.cartProducts.reduce((total: number, product: any) => total + product.product_price, 0);
      },
      (error) => {
        console.error(' Error Get Cart Products', error);
      }
    );
  }
}