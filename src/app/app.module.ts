import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/authguard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewCustomersComponent } from './components/admin-dashboard/components/customers/viewCustomers/viewCustomers.component';
import { ViewProductsComponent } from './components/admin-dashboard/components/products/viewProducts/viewProducts.component';
import { AddCustomersComponent } from './components/admin-dashboard/components/customers/addCustomers/addCustomers.component';
import { AddProductsComponent } from './components/admin-dashboard/components/products/addProducts/addProducts.component';
import { ProductTypesComponent } from './components/admin-dashboard/components/products/productTypes/productTypes.component';
import { CartComponent } from './components/dashboard/cart/cart.component';
import { CustomerBarComponent} from './components/dashboard/shared/customer-bar/customer-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminDashboardComponent,
    ViewCustomersComponent,
    ViewProductsComponent,
    AddCustomersComponent,
    AddProductsComponent,
    ProductTypesComponent,
    CartComponent,
    CustomerBarComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  providers: [AuthService, AuthGuardService], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
