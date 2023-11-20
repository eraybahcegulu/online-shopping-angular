import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { ViewCustomersComponent } from './components/customers/viewCustomers/viewCustomers.component';
import { AddCustomersComponent } from './components/customers/addCustomers/addCustomers.component';

import { ViewProductsComponent } from './components/products/viewProducts/viewProducts.component';
import { AddProductsComponent } from './components/products/addProducts/addProducts.component';
import { ProductTypesComponent } from './components/products/productTypes/productTypes.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {
  components = {
    viewCustomers: ViewCustomersComponent,
    addCustomer: AddCustomersComponent,
    viewProducts: ViewProductsComponent,
    addProduct: AddProductsComponent,
    productTypes: ProductTypesComponent
  };

  selectedComponent: any;
  isCollapsed = false;
  userInfo: any;
  customers: any[] = [];
  products: any[] = [];
  productTypes: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  ViewCustomers() {
    this.selectedComponent = this.components.viewCustomers;
  }

  AddCustomer() {
    this.selectedComponent = this.components.addCustomer;
  }

  AddProduct() {
    this.selectedComponent = this.components.addProduct;
  }

  ViewProducts() {
    this.selectedComponent = this.components.viewProducts;
  }

  ProductTypes() {
    this.selectedComponent = this.components.productTypes;
  }

}