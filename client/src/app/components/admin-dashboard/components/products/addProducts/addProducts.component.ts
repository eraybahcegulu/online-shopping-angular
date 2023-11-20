import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'addProducts',
  templateUrl: './addProducts.component.html',
  styleUrls: ['./addProducts.component.css']
})
export class AddProductsComponent implements OnInit {

  newProductForm: FormGroup;
  productTypes: any[] = [];
  addProductMessage: string = '';
  addProductMessageType: string = '';

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.newProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productQuantity: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.productService.getProductTypes().subscribe(
      (productTypes: any) => {
        this.productTypes = productTypes;
      }
      
    );
  }



  

  get formControls() {
    return this.newProductForm.controls;
  }

  editErrors(inputs: any): boolean {
    if (inputs.value.trim().length < 1 ) {
      return true;
    }
    return false;
  }

  addProduct() {
    if (this.newProductForm.valid) {

      const productData = {
        name: this.newProductForm.controls['productName'].value,
        type: this.newProductForm.controls['productType'].value,
        description: this.newProductForm.controls['productDescription'].value,
        price: this.newProductForm.controls['productPrice'].value,
        quantity: this.newProductForm.controls['productQuantity'].value
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
