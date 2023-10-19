import { Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  userInfo: any;
  customers: any[] = [];
  displayedColumns: string[] = ['_id', 'email', 'password'];
  dataSource = new MatTableDataSource<any>([]);
  loadCustomersTable = false;

  constructor(private authService: AuthService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      }
    );

    this.customerService.getCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.paginator = this.paginator;
    });
  }

  viewCustomers(): void {
    this.loadCustomersTable = !this.loadCustomersTable;
  }
  logout(): void {
    this.authService.logout();
  }


}
