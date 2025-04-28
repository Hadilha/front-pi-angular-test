import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/Services/user/user.service";

@Component({
  selector: "app-card-profile-doctor",
  templateUrl: "./card-profile-doctor.component.html",
  styleUrls: ['./card-profile-doctor.css']
})
export class CardProfileDoctorComponent implements OnInit {
  credentialsForm: FormGroup;  // Proper form declaration
  user: User = {               // User data model
    id: 1,                    // Add missing properties
    role: '',
    profileVerified: false,
    password: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    avatarUrl: '',
    contactNumber: '',
    specializations: '',
    experienceYears: '',
    workingHours: '',
    accountStatus: 'ACTIVE'
  };
  currentusername: string = '';
  errorMessage: string = '';   // Error handling

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Initialize form correctly
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      currentPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      avatarUrl: ['assets/img/white.png'],
      username: ['', Validators.required],
      contactNumber: ['', Validators.required],
      specializations: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      workingHours: ['', Validators.required],
      accountStatus: ['ACTIVE']
    }, { validator: this.passwordMatchValidator });
  }

  // Password validation
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getCurrentUser().subscribe({
      next: (userData) => {
        this.user = userData;  // Store user data
        this.currentusername = this.user.username;

        // Patch form values
        this.credentialsForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          email: this.user.email,
          avatarUrl: this.user.avatarUrl,
          contactNumber: this.user.contactNumber,
          specializations: this.user.specializations,
          experienceYears: this.user.experienceYears,
          workingHours: this.user.workingHours,
          accountStatus: this.user.accountStatus || 'ACTIVE'
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load user data';
      }
    });
  }

  onSubmit() {
    if (this.credentialsForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    const formData = {
      ...this.credentialsForm.value,
      currentUsername: this.currentusername
    };

    this.userService.updateUserDoctor(formData).subscribe({
      next: () => {
        this.router.navigate(['/doctor/profile']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Update failed';
      }
    });
  }
}
