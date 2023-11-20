import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  registrationForm: FormGroup;
  registrationMessage: string = '';
  registrationMessageType: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,

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
    }

    setTimeout(() => {
      this.registrationMessage = '';
      this.registrationMessageType = '';
    }, 2000);
  }

}
