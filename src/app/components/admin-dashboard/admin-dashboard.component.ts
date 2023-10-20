import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {

  userInfo: any;
  customers: any[] = [];
  displayedColumns: string[] = ['_id', 'email', 'password'];
  dataSource = new MatTableDataSource<any>([]);
  showCustomersTable: boolean = false;
  showAddCustomersForm: boolean = false;

  constructor(private authService: AuthService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      }
    );
  
    this.customerService.getCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource(customers);
    });
  }

  viewCustomers() {
    this.showCustomersTable = !this.showCustomersTable;
    this.showAddCustomersForm = false;
  }
  
  viewAddCustomers() {
    this.showCustomersTable = false;
    this.showAddCustomersForm =  !this.showAddCustomersForm;
  }

  logout(): void {
    this.authService.logout();
  }
}
