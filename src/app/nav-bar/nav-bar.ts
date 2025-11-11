import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LogoutButtonComponent } from "../components/logout-button.component";

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule, LogoutButtonComponent],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {

}
