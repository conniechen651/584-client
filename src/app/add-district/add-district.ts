import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AddDistrictService, DataModel } from '../service/district-service';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-add-district',
  imports: [ReactiveFormsModule],
  templateUrl: './add-district.html',
  styleUrl: './add-district.scss'
})
export class AddDistrict implements OnInit{
  form!: UntypedFormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  
  constructor(private dataService: AddDistrictService, public auth: AuthService) {}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      // Define form controls here
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

      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData: DataModel = this.form.value;

      this.dataService.postData(formData).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.submitSuccess = true;
          this.isSubmitting = false;
          this.form.reset(); // Reset form after successful submission
        },

        error: (error) => {
          console.error('Error:', error);
          this.submitError = true;
          this.errorMessage = error.error?.message || 'An error occurred while submitting the form';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }

  onReset(): void {
    this.form.reset();
    this.submitSuccess = false;
    this.submitError = false;
  }
}
