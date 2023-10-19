import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customers',
  templateUrl: './app-customers.component.html',
  styleUrls: ['./app-customers.component.css'],
})
export class AppCustomersComponent implements AfterViewInit {
  @Input() dataSource: any;
  displayedColumns: string[] = ['_id', 'email', 'password'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
