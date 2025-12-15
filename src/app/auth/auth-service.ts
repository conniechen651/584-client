import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token = "auth token";
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  constructor(private http: HttpClient) {}

  init() {
    if(this.isLoggedIn()){
      this.setAuthStatus(true);
    }
  }

  setAuthStatus(isLoggedIn: boolean) {
    this._authStatus.next(isLoggedIn);
  }

  login(loginRequest: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/Login`, loginRequest)
    .pipe(tap(response => {
      if (response.success){
        localStorage.setItem(this.token, response.token);
        this.setAuthStatus(true);
      }
    }));
  }

  logout() {
    this.setAuthStatus(false);
    localStorage.removeItem(this.token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
