import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCustomersComponent } from './app-customers.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [AppCustomersComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [AppCustomersComponent],
})
export class AppCustomersModule {}
