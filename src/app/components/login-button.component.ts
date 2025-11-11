import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button
      mat-flat-button
      color="primary"
      (click)="loginWithRedirect()"
      class="button login"
    >
      Log In
    </button>
  `
})
export class LoginButtonComponent {
  private auth = inject(AuthService);

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}