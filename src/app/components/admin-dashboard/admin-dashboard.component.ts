import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {

  userInfo: any;
  customers: any[] = [];
  products: any[] = [];
  displayedColumns: string[] = ['_id', 'email', 'password'];
  dataSourceProducts = new MatTableDataSource<any>([]);
  dataSourceCustomers = new MatTableDataSource<any>([]);
  currentView: string = '';

  constructor(private authService: AuthService, private customerService: CustomerService, private productService: ProductService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      }
    );

    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products;
      this.dataSourceProducts = new MatTableDataSource(products);
    });
  
    this.customerService.getCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
      this.dataSourceCustomers = new MatTableDataSource(customers);
    });
  }

  view(view: string) {
    if (this.currentView === view) {
      this.currentView = '';
    } else {
      this.currentView = view;
    }
  }


  logout(): void {
    this.authService.logout();
  }
}
