import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LogoutButtonComponent } from "../components/logout-button.component";
import { LoginButtonComponent } from "../components/login-button.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, MatToolbarModule, MatIconModule,MatButtonModule, 
    LogoutButtonComponent, LoginButtonComponent, AsyncPipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {
  constructor(public auth: AuthService) {}
}
