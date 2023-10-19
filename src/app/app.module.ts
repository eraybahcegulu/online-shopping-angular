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
import { AppCustomersModule  } from './components/admin-dashboard/components/app-customers/app.customers.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminDashboardComponent,

  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppCustomersModule,
  ],
  providers: [AuthService, AuthGuardService], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
