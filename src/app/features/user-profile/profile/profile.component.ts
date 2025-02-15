import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  successMessage = '';
  isLoading = true;

  get isFormPristine(): boolean {
    return this.profileForm?.pristine;
  }

  get isFormValid(): boolean {
    return this.profileForm?.valid;
  }

  get isFormDirty(): boolean {
    return this.profileForm?.dirty;
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.isLoading = false;
    this.cdr.detectChanges(); // Force detection since we're using OnPush
  }

  private initializeForm() {
    const savedProfile = localStorage.getItem('userProfile');
    const initialData = savedProfile ? JSON.parse(savedProfile) : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        country: ''
      }
    };

    this.profileForm = this.fb.group({
      firstName: [initialData.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [initialData.lastName, [Validators.required, Validators.minLength(2)]],
      email: [initialData.email, [Validators.required, Validators.email]],
      phone: [initialData.phone, [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: this.fb.group({
        street: [initialData.address.street, Validators.required],
        city: [initialData.address.city, Validators.required],
        country: [initialData.address.country, Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      localStorage.setItem('userProfile', JSON.stringify(this.profileForm.value));
      this.successMessage = 'Profile updated successfully!';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.successMessage = '';
        this.cdr.detectChanges();
      }, 3000);
    }
  }

  resetForm() {
    this.profileForm.reset(this.profileForm.value);
    this.cdr.detectChanges();
  }
}
