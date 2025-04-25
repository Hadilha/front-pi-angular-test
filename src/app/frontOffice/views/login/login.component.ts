import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

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

  onSubmit() {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.errorMessage = '';

      const { username, password } = this.loginForm.value;
      this.UserService.login(username, password).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message.replace('Login failed: ', '');
          console.error('Login error:', err);
        }
      });
    }
  }}
