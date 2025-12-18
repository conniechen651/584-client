import { TestBed } from '@angular/core/testing';
import { HttpHandlerFn, HttpRequest, HttpResponse, provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';

describe('authInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', (done) => {
    const testToken = 'fake-jwt-token';
    authService.getToken.and.returnValue(testToken);

    const mockReq = new HttpRequest('GET', '/api/Schools');
    const mockNext: HttpHandlerFn = (req) => {
      expect(req.headers.has('Authorization')).toBeTrue();
      expect(req.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
      done();
      return of(new HttpResponse({ status: 200, body: null }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(mockReq, mockNext).subscribe();
    });
  });

  it('should not add Authorization header when token is null', (done) => {
    authService.getToken.and.returnValue(null);

    const mockReq = new HttpRequest('GET', '/api/Schools');
    const mockNext: HttpHandlerFn = (req) => {
      expect(req.headers.has('Authorization')).toBeFalse();
      done();
      return of(new HttpResponse({ status: 200, body: null }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(mockReq, mockNext).subscribe();
    });
  });

  // ...401 / non-401 tests unchanged...

  it('should pass through successful requests unchanged', (done) => {
    authService.getToken.and.returnValue('fake-token');

    const mockReq = new HttpRequest('GET', '/api/Schools');
    const mockNext: HttpHandlerFn = () => {
      return of(new HttpResponse({ status: 200, body: { data: 'test' } }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(mockReq, mockNext).subscribe({
        next: (response) => {
          if (response instanceof HttpResponse) {
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ data: 'test' });
            done();
          }
        }
      });
    });
  });

  it('should handle requests without token', (done) => {
    authService.getToken.and.returnValue(null);

    const mockReq = new HttpRequest('POST', '/api/Login', { username: 'user', password: 'pass' });
    const mockNext: HttpHandlerFn = (req) => {
      expect(req.headers.has('Authorization')).toBeFalse();
      return of(new HttpResponse({ status: 200, body: { token: 'new-token' } }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(mockReq, mockNext).subscribe({
        next: (response) => {
          if (response instanceof HttpResponse) {
            expect(response.body).toEqual({ token: 'new-token' });
          }
          done();
        }
      });
    });
  });

  it('should clone request with Authorization header', (done) => {
    const testToken = 'test-token-123';
    authService.getToken.and.returnValue(testToken);

    const mockReq = new HttpRequest('GET', '/api/District');

    const mockNext: HttpHandlerFn = (req) => {
      expect(req).not.toBe(mockReq);
      expect(req.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
      done();
      return of(new HttpResponse({ status: 200, body: null }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(mockReq, mockNext).subscribe();
    });
  });
});
