import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = {
    email: '',
    password: '',
  };

  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.error = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.user.role === 'admin') {
          this.router.navigate(['/manage-products']);
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
