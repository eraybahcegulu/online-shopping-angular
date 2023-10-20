import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'viewCustomers',
  templateUrl: './viewCustomers.component.html',
  styleUrls: ['./viewCustomers.component.css'],
})
export class ViewCustomersComponent implements AfterViewInit {
  @Input() dataSource: any;
  displayedColumns: string[] = ['_id', 'email', 'password'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}