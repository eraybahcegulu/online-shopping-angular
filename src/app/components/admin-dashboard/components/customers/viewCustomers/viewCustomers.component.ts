import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'viewCustomers',
  templateUrl: './viewCustomers.component.html',
  styleUrls: ['./viewCustomers.component.css'],
})
export class ViewCustomersComponent implements AfterViewInit {
  @Input() dataSourceCustomers: any;
  displayedColumns: string[] = ['_id', 'email', 'password', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSourceCustomers.paginator = this.paginator;
    }
  }
}