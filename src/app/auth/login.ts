import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service';
import { LoginRequest } from './login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  form!: UntypedFormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Initialize the form here
    this.form = new UntypedFormGroup({
      // Define form controls here
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
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

    let loginRequest = <LoginRequest>{
      username: this.form.controls["username"].value,
      password: this.form.controls["password"].value
    };

    let response = this.authService.login(loginRequest).subscribe({
      next: result => {
        console.log('Success:', result);
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.cdr.detectChanges(); 
        this.router.navigate(['/']);
      },
      error: result => {
        console.error('Error:', result);
        this.submitError = true;
        this.errorMessage = result.error?.message || 'The username or password is incorrect';
        this.isSubmitting = false;
        this.cdr.detectChanges(); 
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
