import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './app-customers.component.html',
  styles: [],
  
})
export class AppCustomersComponent {
  @Input() dataSource: any;
  displayedColumns: string[] = ['_id', 'email', 'password'];
  
}
