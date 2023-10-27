import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'viewProducts',
  templateUrl: './viewProducts.component.html',
  styleUrls: ['./viewProducts.component.css'],
})
export class ViewProductsComponent implements AfterViewInit {
  @Input() dataSourceProducts: any;
  displayedColumns: string[] = ['_id', 'name', 'description', 'price', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSourceProducts.paginator = this.paginator;
    }
  }
}