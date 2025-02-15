import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <ul>
        <li><a routerLink="/dashboard">Dashboard</a></li>
        <li><a routerLink="/auth/login">Login</a></li>
        <li><a routerLink="/auth/register">Register</a></li>
        <li><a routerLink="/profile">Profile</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      background-color: #333;
      padding: 1rem;
    }
    .navbar ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 1rem;
    }
    .navbar a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .navbar a:hover {
      background-color: #555;
    }
  `]
})
export class AppComponent {
  title = 'angular-laboratory';
}
