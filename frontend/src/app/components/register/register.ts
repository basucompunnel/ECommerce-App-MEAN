import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  };

  roles = ['user', 'admin'];

  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { username, email, password, role } = this.userData;

    this.authService.register({ username, email, password, role }).subscribe({
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
        this.error = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }

  validateForm(): boolean {
    if (!this.userData.username || !this.userData.email || !this.userData.password) {
      this.error = 'Please fill in all fields';
      return false;
    }

    if (this.userData.username.length < 3) {
      this.error = 'Username must be at least 3 characters';
      return false;
    }

    if (this.userData.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return false;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      this.error = 'Passwords do not match';
      return false;
    }

    return true;
  }
}
