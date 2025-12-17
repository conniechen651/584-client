import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AddDistrictService, DataModel } from '../service/district-service';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-add-district',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-district.html',
  styleUrl: './add-district.scss'
})
export class AddDistrict implements OnInit {
  form!: UntypedFormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(private dataService: AddDistrictService, public auth: AuthService, private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      name: new FormControl('', Validators.required),
      county: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Reset error states before submission
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';

    const formData: DataModel = this.form.value;

    console.log('Submitting form data:', formData); // DEBUG
    
    this.dataService.postData(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.submitError = false;
        this.form.reset(); // Reset form after successful submission
      },
      error: (error) => {
        console.error('Error:', error);
        this.submitError = true;
        this.submitSuccess = false;
        this.errorMessage = error.error?.message || 'An error occurred while submitting the form';
        this.isSubmitting = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  onReset(): void {
    this.form.reset();
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';
  }
}