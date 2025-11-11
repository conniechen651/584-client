import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './components/login-button.component';
import { NavBar } from "./nav-bar/nav-bar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, NavBar, RouterOutlet],
  template: `
    <div class="app-container">
      <!-- Loading State -->
      @if (auth.isLoading$ | async) {
        <div class="loading-state">
          <div class="loading-text">Loading...</div>
        </div>
      }

      <!-- Error State -->
      @if (auth.error$ | async; as error) {
        <div class="error-state">
          <div class="error-title">Oops!</div>
          <div class="error-message">Something went wrong</div>
          <div class="error-sub-message">{{ error.message }}</div>
        </div>
      }

      <!-- Main Content -->
      @if (!(auth.isLoading$ | async) && !(auth.error$ | async)) {
          
          <!-- Authenticated State -->
          @if (auth.isAuthenticated$ | async) {
              <app-nav-bar></app-nav-bar>
              <div class="container">
                <router-outlet></router-outlet>
              </div>
          } @else {
            <!-- Unauthenticated State -->
            <div class="action-card">
              <p class="action-text">Get started by signing in to your account</p>
              <app-login-button />
            </div>
          }
      }
    </div>
  `
})
export class AppComponent {
  protected auth = inject(AuthService);
}