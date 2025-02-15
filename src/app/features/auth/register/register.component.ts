import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input id="name" type="text" formControlName="name">
          <div *ngIf="registerForm.get('name')?.errors?.['required'] && registerForm.get('name')?.touched">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email">
          <div *ngIf="registerForm.get('email')?.errors?.['required'] && registerForm.get('email')?.touched">
            Email is required
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" formControlName="password">
          <div *ngIf="registerForm.get('password')?.errors?.['required'] && registerForm.get('password')?.touched">
            Password is required
          </div>
        </div>

        <button type="submit" [disabled]="!registerForm.valid">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
  `]
})
export default class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register form submitted:', this.registerForm.value);
      // Simulate successful registration
      this.router.navigate(['/auth/login']);
    }
  }
}
