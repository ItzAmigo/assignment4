// profile.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); // Explicitly call ngOnInit
    fixture.detectChanges();
  });

  it('should validate required fields', fakeAsync(() => {
    tick(); // Wait for async operations
    fixture.detectChanges();

    const form = component.profileForm;
    form.get('firstName')?.setValue('');
    form.get('lastName')?.setValue('');
    form.get('email')?.setValue('');

    form.get('firstName')?.markAsTouched();
    form.get('lastName')?.markAsTouched();
    form.get('email')?.markAsTouched();

    expect(form.get('firstName')?.errors?.['required']).toBeTruthy();
    expect(form.get('lastName')?.errors?.['required']).toBeTruthy();
    expect(form.get('email')?.errors?.['required']).toBeTruthy();
  }));
});
