import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'viewProducts',
  templateUrl: './viewProducts.component.html',
  styleUrls: ['./viewProducts.component.css'],
})
export class ViewProductsComponent implements OnInit {

  dataSourceProducts: any;
  products: any[] = [];
  productTypes: any[] = [];

  message: string = '';
  messageType: string = '';

  displayedColumns: string[] = ['_id', 'name', 'type', 'description', 'price', 'quantity', 'actions'];
  constructor(private productService: ProductService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.products = products;
        this.dataSourceProducts = new MatTableDataSource(this.products);
        this.dataSourceProducts.paginator = this.paginator;
      }
    );
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(
      (productTypes: any) => {
        this.productTypes = productTypes;
      }
    );
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        this.handleDeleteProductResponse(response);
        this.getProducts();
      },
      (error) => {
        this.handleDeleteProductError(error);
      }
    );
  }

  private handleDeleteProductResponse(response: any): void {
    this.message = response.message;
    this.messageType = 'success';
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 2000);
  }

  private handleDeleteProductError(error: HttpErrorResponse): void {
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


  editErrors(product: any): boolean {
    if (product.name.trim().length < 1 || product.description.trim().length < 1 || product.price === null || product.price === undefined || product.quantity === null || product.quantity === undefined) {
      return true;
    }
    return false;
  }

  startEditing(product: any) {
    product.isEditing = true;
  }

  saveEditedProduct(product: any) {
    product.isEditing = false;

    const updatedProductData = {
      name: product.name,
      type: product.type,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    };

    this.productService.updateProduct(product._id, updatedProductData).subscribe(
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
        this.getProducts();
      }
      
    );

  }
}