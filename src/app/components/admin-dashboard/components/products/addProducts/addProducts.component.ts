import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'addProducts',
  templateUrl: './addProducts.component.html',
  styleUrls: ['./addProducts.component.css']
})
export class AddProductsComponent {
  newProductForm: FormGroup;

  addProductMessage: string = '';
  addProductMessageType: string = '';

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.newProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.newProductForm.controls;
  }

  onPriceInput(event: any) {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9.]/g, '');
    this.newProductForm.controls['productPrice'].setValue(numericValue);
  }

  addProduct() {
    if (this.newProductForm.valid) {

      const productData = {
        name: this.newProductForm.controls['productName'].value,
        description: this.newProductForm.controls['productDescription'].value,
        price: this.newProductForm.controls['productPrice'].value
      };
  
      this.productService.addProduct(productData).subscribe(
        (response) => {
          this.handleAddProductResponse(response);
        },
        (error) => {
          this.handleAddProductError(error);
        }
      );
    }
  }

  private handleAddProductResponse(response: any): void {
    this.addProductMessage = response.message;
    this.addProductMessageType = 'success';
    this.newProductForm.reset();
    setTimeout(() => {
      this.addProductMessage = '';
      this.addProductMessageType = '';
    }, 2000);
  }

  private handleAddProductError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      this.addProductMessage = error.error.message;
      this.addProductMessageType = 'danger';
    } else {
      console.error('Registration failed', error);
    }
    setTimeout(() => {
      this.addProductMessage = '';
      this.addProductMessageType = '';
    }, 2000);
  }
}
