  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { UserService } from 'src/app/Services/user.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-credentials-patient',
    templateUrl: './credentials-patient.component.html',
    styleUrls: ['./credentials-patient.component.css']
  })
  export class CredentialsPatientComponent implements OnInit {
    credentialsForm: FormGroup;
    isLoading = false;
    errorMessage = '';
    currentusername: string = '';

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      public  router: Router
    ) {
      this.credentialsForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(8)]],
        currentPassword: ['', Validators.required],
        firstName: '',
        lastName: '',
        birth: '',
      });
    }

    ngOnInit() {
      this.loadUserData();
    }


    loadUserData() {
      this.userService.getCurrentUserpatient().subscribe({
        next: (user) => {
          this.currentusername = user.username;

          this.credentialsForm.patchValue({
            firstName: user.firstname,
            lastName: user.lastname,
            birth: user.birth ? new Date(user.birth).toISOString().split('T')[0] : '',
            email: user.email
          });
        },
        error: (err) => console.error(err)
      });
    }

    onSubmit() {
      console.log('Form valid:', this.credentialsForm.valid);
      console.log('Form values:', this.credentialsForm.value);
console.log(this.credentialsForm.valid);
      if (this.credentialsForm.valid) {
        this.isLoading = true;
        this.userService.updateUserpatient(this.credentialsForm.value, this.currentusername)
          .subscribe({
            next: () => {
              this.router.navigate(['/patientspace/profile']);
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Update error:', err);
              this.errorMessage = 'Update failed. Please check your current password.';
              this.isLoading = false;
            }
          });
      }
    }
  }
