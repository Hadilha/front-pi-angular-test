import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.checkSessionConflict();
  }
  private checkSessionConflict() {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('sessionConflict')) {
      this.errorMessage = 'Another session is active. Please log out from other sessions.';
      history.replaceState(null, '', window.location.pathname);
    }
  }
  private performLogin(username: string, password: string) {
    this.loading = true;
    this.errorMessage = '';

    this.UserService.login(username, password).subscribe({
      next: () => this.loading = false,
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message.replace('Login failed: ', '');
      }
    });
  }
  onSubmit() {
    if (this.loginForm.valid && !this.loading) {
      const { username, password } = this.loginForm.value;

      if (this.UserService.isLoggedIn()) {
        const currentUser = this.UserService.getCurrentUsername();
        if (currentUser && currentUser !== username) {
          this.errorMessage = 'Another user is already logged in. Please log out first.';
          return;
        }
      }

      this.loading = true;
      this.errorMessage = '';

      this.UserService.login(username, password).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message;
          console.error('Login error:', err);
        }
      });
    }
  }
}
