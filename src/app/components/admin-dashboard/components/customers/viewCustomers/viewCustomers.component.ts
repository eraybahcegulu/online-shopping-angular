import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from '../../../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'viewCustomers',
  templateUrl: './viewCustomers.component.html',
  styleUrls: ['./viewCustomers.component.css'],
})
export class ViewCustomersComponent implements AfterViewInit {

  deleteCustomerMessage: string = '';
  deleteCustomerMessageType: string = '';

  @Input() dataSourceCustomers: any;
  displayedColumns: string[] = ['_id', 'email', 'password', 'actions'];
  constructor(private customerService: CustomerService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSourceCustomers.paginator = this.paginator;
    }
  }

  deleteCustomer(customerId: string) {
    this.customerService.deleteCustomer(customerId).subscribe(
      (response) => {
        this.handleDeleteCustomerResponse(response);
        this.dataSourceCustomers.data = this.dataSourceCustomers.data.filter((customer: { _id: string; }) => customer._id !== customerId);
      },
      (error) => {
        this.handleDeleteCustomerError(error);
      }
    );
  }

  private handleDeleteCustomerResponse(response: any): void {
    this.deleteCustomerMessage = response.message;
    this.deleteCustomerMessageType = 'success';
    setTimeout(() => {
      this.deleteCustomerMessage = '';
      this.deleteCustomerMessageType = '';
    }, 2000);
  }

  private handleDeleteCustomerError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      this.deleteCustomerMessage = error.error.message;
      this.deleteCustomerMessageType = 'danger';
    } else {
      console.error('Registration failed', error);
    }
    setTimeout(() => {
      this.deleteCustomerMessage = '';
      this.deleteCustomerMessageType = '';
    }, 2000);
  }

  editCustomer(){

  }
}