import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  email: string = '';
  password: string = '';
  registrationMessage: string = '';
  registrationMessageType: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }
  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.authService.register(
      this.registrationForm.controls['email'].value,
      this.registrationForm.controls['password'].value
    ).subscribe(
      (response) => {
        this.handleRegistrationResponse(response);
      },
      (error) => {
        this.handleRegistrationError(error);
      }
    );
  }

  private handleRegistrationResponse(response: any): void {
    this.registrationMessage = response.message;
    this.registrationMessageType = 'success';
    this.registrationForm.reset();
    setTimeout(() => {
      this.registrationMessage = '';
      this.registrationMessageType = '';
    }, 2000);
  }

  private handleRegistrationError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      this.registrationMessage = error.error.message;
      this.registrationMessageType = 'danger';
    } else {
      console.error('Registration failed', error);
      this.registrationMessage = 'Registration failed';
      this.registrationMessageType = 'danger';
    }

    setTimeout(() => {
      this.registrationMessage = '';
      this.registrationMessageType = '';
    }, 2000);
  }
}
