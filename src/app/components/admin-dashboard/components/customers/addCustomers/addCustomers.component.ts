import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'addCustomers',
  templateUrl: './addCustomers.component.html',
  styleUrls: ['./addCustomers.component.css']
})
export class AddCustomersComponent {
  hide = true;
  newCustomerForm: FormGroup;
  addCustomerMessage: string = '';
  addCustomerMessageType: string = '';

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) {
    this.newCustomerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.newCustomerForm.controls;
  }

  addCustomer() {
    if (this.newCustomerForm.invalid) {
      return;
    }

    const customerData = {
      email: this.newCustomerForm.controls['email'].value,
      password: this.newCustomerForm.controls['password'].value
    };

    this.customerService.addCustomer(customerData).subscribe(
      (response) => {
        this.handleAddCustomerResponse(response);
      },
      (error) => {
        this.handleAddCustomerError(error);
      }
    );
  }

  private handleAddCustomerResponse(response: any): void {
    this.addCustomerMessage = response.message;
    this.addCustomerMessageType = 'success';
    this.newCustomerForm.reset();
    setTimeout(() => {
      this.addCustomerMessage = '';
      this.addCustomerMessageType = '';
    }, 2000);
  }

  private handleAddCustomerError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      this.addCustomerMessage = error.error.message;
      this.addCustomerMessageType = 'danger';
    } else {
      console.error('Registration failed', error);
    }
    setTimeout(() => {
      this.addCustomerMessage = '';
      this.addCustomerMessageType = '';
    }, 2000);
  }
}
