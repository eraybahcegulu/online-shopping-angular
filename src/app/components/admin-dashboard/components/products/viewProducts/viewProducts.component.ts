import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'viewProducts',
  templateUrl: './viewProducts.component.html',
  styleUrls: ['./viewProducts.component.css'],
})
export class ViewProductsComponent implements AfterViewInit {
  @Input() dataSourceProducts: any;

  message: string = '';
  messageType: string = '';

  displayedColumns: string[] = ['_id', 'name', 'description', 'price', 'actions'];
  constructor(private productService: ProductService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSourceProducts.paginator = this.paginator;
    }
  }


  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        this.handleDeleteProductResponse(response);
        this.dataSourceProducts.data = this.dataSourceProducts.data.filter((product: { _id: string; }) => product._id !== productId);
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
    if (product.name.trim().length < 2 || product.description.trim().length < 2 || product.price === null || product.price === undefined) {
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
      description: product.description,
      price: product.price
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
      }
    );

  }
}