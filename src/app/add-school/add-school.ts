import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AddSchoolService, DataModel } from '../service/school-service';
import { AuthService } from '../auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { DistrictData } from '../district/district-data';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-school',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-school.html',
  styleUrl: './add-school.scss'
})
export class AddSchool implements OnInit{
  form!: UntypedFormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  districts$: Observable<DistrictData[]> = of([]);
  
  constructor(private dataService: AddSchoolService, public auth: AuthService, private http: HttpClient) {
    this.districts$ = this.http.get<DistrictData[]>(`${environment.apiUrl}/api/Districts`);
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      // Define form controls here
      name: new FormControl('', Validators.required),
      districtId: new FormControl('', Validators.required),
      mathScore: new FormControl('', Validators.required),
      readingScore: new FormControl('', Validators.required),
      writingScore: new FormControl('', Validators.required),
      numTestTakers: new FormControl('', Validators.required)
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
