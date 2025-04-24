import { UserService } from './../../../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent {
 // forgot-pw.component.ts


@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
  forgotForm: FormGroup;
  loading = false;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.loading = true;
    this.message = null;
    this.errorMessage = null;

    const email = this.forgotForm.value.email;
/// forgot-pw.component.ts
this.UserService.forgotPassword(email).subscribe({
  next: () => {
    this.message = 'Password reset instructions sent to your email';
    this.errorMessage = null;
    this.loading = false;
    setTimeout(() => this.router.navigate(['/auth/login']), 3000);
  },
  error: (err) => {
    // Handle empty response with 200 status
    if (err.status === 200) {
      this.message = 'Password reset instructions sent to your email';
      this.errorMessage = null;
    } else {
      this.errorMessage = err.error?.message || 'Error sending reset instructions';
    }
    this.loading = false;
  }
});}

}
