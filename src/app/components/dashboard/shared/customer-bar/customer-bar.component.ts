import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-bar',
  templateUrl: './customer-bar.component.html',
  styleUrls: ['./customer-bar.component.css']
})
export class CustomerBarComponent {
  @Input() set updateCart(productAdded: any) {
    productAdded.subscribe(() => {
      this.updateCartTotalItems();
    });
  }

  userInfo: any;
  cartTotalItems: number = 0;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) { }

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
  }

  updateCartTotalItems() {
    if (this.userInfo && this.userInfo._id) {
      this.cartService.getCartTotalItems(this.userInfo._id).subscribe(
        (totalItems: number) => {
          this.cartTotalItems = totalItems;
          console.log(this.cartTotalItems);
        }
      );
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}