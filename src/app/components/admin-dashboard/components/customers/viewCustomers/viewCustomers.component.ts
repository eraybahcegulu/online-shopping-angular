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

  message: string = '';
  messageType: string = '';

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
    this.message = response.message;
    this.messageType = 'success';
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 2000);
  }

  private handleDeleteCustomerError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      this.message = error.error.message;
      this.messageType = 'danger';
    } else {
      console.error('Failed', error);
    }
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 2000);
  }

  editErrors(customer: any): boolean {
    if (!customer.email.includes('@') || customer.email.trim().length < 3 || customer.password.trim().length < 6) {
      return true;
    }
    return false;
  }

  startEditing(customer: any) {
    customer.isEditing = true;
  }

  saveEditedCustomer(customer: any) {
    customer.isEditing = false;
  
    const updatedCustomerData = {
      email: customer.email,
      password: customer.password,
    };

    this.customerService.updateCustomer(customer._id, updatedCustomerData).subscribe(
      (response) => {
        this.message = response.message;
        this.messageType = 'success';
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
        }, 2000);
      },
      (error) => {
        if (error.status === 400) {
          this.message = error.error.message;
          this.messageType = 'danger';
        } else {
          console.error('Failed', error);
        }
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
        }, 2000);
      }
    );
  }
}