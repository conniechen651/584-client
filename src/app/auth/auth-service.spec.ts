import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AuthService } from './auth-service';
import { LoginRequest } from './login-request';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should POST login data to the correct URL', () => {
    const mockLoginData: LoginRequest = {
      username: 'user',
      password: 'password'
    };

    const mockResponse = { success: true, message: 'mom loves me', token: 'fake-jwt-token' };

    service.login(mockLoginData).subscribe(response => {
      expect(response.success).toBeTrue();
    });

    // Add this log to verify the URL
    console.log('Expected URL:', `${environment.apiUrl}/api/Login`);

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/Login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginData);
    req.flush(mockResponse);

    expect(localStorage.getItem('auth token')).toBe('fake-jwt-token');
  });

  it('should not store token on failed login', () => {
    const mockLoginRequest: LoginRequest = {
      username: 'user',
      password: 'wrongpassword'
    };

    service.login(mockLoginRequest).subscribe();

    const req = httpTestingController.expectOne({method: 'POST', url: `${environment.apiUrl}/api/Login`});
    req.flush({ success: false, token: null });

    expect(localStorage.getItem('auth token')).toBeNull();
  });

  it('should logout and clear token', () => {
    // Set a token first
    localStorage.setItem('auth token', 'fake-jwt-token');
    service.setAuthStatus(true);

    service.logout();

    expect(localStorage.getItem('auth token')).toBeNull();
    service.authStatus.subscribe(status => {
      expect(status).toBeFalse();
    });
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('auth token', 'fake-jwt-token');
    expect(service.getToken()).toBe('fake-jwt-token');
  });

  it('should return null if no token exists', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should correctly identify if user is logged in', () => {
    expect(service.isLoggedIn()).toBeFalse();

    localStorage.setItem('auth token', 'fake-jwt-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should initialize auth status when logged in', () => {
    localStorage.setItem('auth token', 'fake-jwt-token');
    service.init();

    service.authStatus.subscribe(status => {
      expect(status).toBeTrue();
    });
  });
  
});
