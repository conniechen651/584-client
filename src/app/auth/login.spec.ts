import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AuthService } from './auth-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: AuthService;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        AuthService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.form.get('username')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
    expect(component.form.valid).toBeFalse();
  });

  it('should require both username and password', () => {
    const usernameControl = component.form.get('username');
    const passwordControl = component.form.get('password');

    expect(usernameControl?.hasError('required')).toBeTrue();
    expect(passwordControl?.hasError('required')).toBeTrue();

    usernameControl?.setValue('testuser');
    expect(usernameControl?.hasError('required')).toBeFalse();
    expect(component.form.valid).toBeFalse();

    passwordControl?.setValue('password123');
    expect(passwordControl?.hasError('required')).toBeFalse();
    expect(component.form.valid).toBeTrue();
  });

  it('should disable submit button when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'))?.nativeElement as HTMLButtonElement;
    expect(button?.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', async () => {
    component.form.setValue({ username: 'user', password: 'pass' });
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]'))?.nativeElement as HTMLButtonElement;
    expect(button?.disabled).toBeFalse();
  });

  it('should call authService.login on form submit', () => {
    spyOn(authService, 'login').and.returnValue(of({ success: true, token: 'fake-token', message: 'Success' }));
    spyOn(router, 'navigate');

    component.form.setValue({ username: 'testuser', password: 'testpass' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
  });
});
