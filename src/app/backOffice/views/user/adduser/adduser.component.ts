import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  @Output() cancelled = new EventEmitter<void>();
  userForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  isEditMode = false;
  currentUserId: number | null = null;
  currentUsername: string = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      role: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }
  currentUserRole: string | null = null;
  availableRoles: string[] = [];
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  ngOnInit() {
    this.currentUserRole = this.userService.getCurrentUserRole();
    this.setAvailableRoles();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentUserId = +params['id'];
        this.loadUserForEdit(this.currentUserId);
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('confirmPassword')?.clearValidators();
        this.userForm.get('password')?.setValidators(Validators.nullValidator);
        this.userForm.get('confirmPassword')?.setValidators(Validators.nullValidator);
        this.userForm.updateValueAndValidity();
      }
    });
  }

  loadUserForEdit(userId: number) {
    this.isLoading = true;
    this.userService.getUserById(userId).subscribe({
      next: (user: any) => {
        this.currentUsername = user.username;
        console.log('Loaded user data:', user); // Debug log

        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          firstName: user.firstname || '', // Fallback to empty string if null
          lastName: user.lastname || '',  // Fallback to empty string if null
          role: user.role,
        });
        console.log('Form values after patch:', this.userForm.value); // Debug log

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load user data';
      }
    });
  }
  onSubmit() {
    if (this.userForm.invalid) return;

    console.log('Current username before update:', this.currentUsername); // Debug log
    console.log('Form values:', this.userForm.value); // Debug log

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.userForm.value;
    const userData = {
      ...formValue,
      currentUsername: this.currentUsername, // Ensure this is set
      role: formValue.role,
      firstname: formValue.firstName,
      lastname: formValue.lastName
    };

    console.log('Data being sent to service:', userData); // Debug log


    if (this.isEditMode && this.currentUserId) {
      userData.id = this.currentUserId;
      this.userService.updateUseradmin(userData).subscribe({
        next: () => this.handleSuccess('User updated successfully!'),
        error: (error) => this.handleError(error)
      });
    } else {
      this.userService.registerUser(userData).subscribe({
        next: () => this.handleSuccess('User created successfully!'),
        error: (error) => this.handleError(error)
      });
    }
  }
  handleSuccess(message: string): void {
    this.isLoading = false;
    console.log("in the handle succ");
    console.log(this.userService.getCurrentUserRole()); // Debug log

    // Force reload user list data
    this.userService.notifyDataChanged(); // Add this line (see Step 2)
if (this.userService.getCurrentUserRole() === 'ADMIN') {
      this.router.navigate(['/admin/usermanagment']); // Or appropriate route
    }
    else if (this.userService.getCurrentUserRole() === 'DOCTOR') {
      this.location.back();
      this.location.back();
    }
  }

  handleError(error: any): void {
    this.isLoading = false;
    this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
    console.error('Error:', error);
  }

  onCancel() {
    this.cancelled.emit();
    this.userForm.reset();
    this.isEditMode = false;


    let role = this.userService.getCurrentUserRole();
    console.log('currentUserId:', this.currentUserId);
    console.log("role:", role);

    if (role === 'ADMIN') {
      this.router.navigate(['/admin/usermanagment']);
    } else if (role === 'DOCTOR') {
      this.router.navigate(['/doctor/patientList']);
    }
  }


  private setAvailableRoles(): void {
    if (this.currentUserRole === 'DOCTOR') {
      this.availableRoles = ['PATIENT'];
    } else if (this.currentUserRole === 'ADMIN') {
      this.availableRoles = ['ADMIN', 'DOCTOR', 'COACH', 'PATIENT'];
    } else {
      this.availableRoles = [];
    }
  }
}
