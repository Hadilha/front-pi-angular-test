import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
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
  currentUsername = '';
  uploadError: string | null = null;
  currentUserRole: string | null = null;
  availableRoles: string[] = [];

  // Expose role-based getters for template
  get isDoctor(): boolean {
    return this.userForm.get('role')?.value === 'DOCTOR';
  }

  get isPatient(): boolean {
    return this.userForm.get('role')?.value === 'PATIENT';
  }

  // Group-level password match validator
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }
    const pw = control.get('password')?.value;
    const cpw = control.get('confirmPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.userForm = this.fb.group({
      avatarUrl: ['assets/img/null.png'],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.maxLength(50)],
      lastName: ['', Validators.maxLength(50)],
      role: ['', Validators.required],
      birth: ['', Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)],
      primaryCarePhysician: ['', Validators.maxLength(100)],
      workingHours: ['', Validators.maxLength(50)],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      specializations: ['', Validators.maxLength(200)],
      experienceYears: ['', [Validators.min(0), Validators.max(100)]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.currentUserRole = this.userService.getCurrentUserRole();
    this.setAvailableRoles();

    // Toggle validators when role changes
    this.userForm.get('role')!.valueChanges.subscribe(role => this.toggleRoleFields(role));

    // Check if in edit mode
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.isEditMode = true;
        this.currentUserId = +userId;
        this.loadUserForEdit(this.currentUserId);
        this.togglePasswordFields(true);
      } else {
        this.isEditMode = false;
        this.currentUserId = null;
        this.togglePasswordFields(false);
      }
    });
  }

  loadUserForEdit(userId: number) {
    this.isLoading = true;
    this.userService.getUserById(userId).subscribe({
      next: (user: any) => {
        this.currentUsername = user.username;
        this.userForm.patchValue({
          avatarUrl: user.avatarUrl || 'assets/img/null.png',
          username: user.username,
          email: user.email,
          firstName: user.firstname || '',
          lastName: user.lastname || '',
          role: user.role,
          birth: user.birth || '',
          primaryCarePhysician: user.primaryCarePhysician || ''
        });
        this.toggleRoleFields(user.role);
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load user data';
      }
    });
  }

  private toggleRoleFields(role: string) {
    const contact = this.userForm.get('contactNumber')!;
    const hours   = this.userForm.get('workingHours')!;
    const specs   = this.userForm.get('specializations')!;
    const expYrs  = this.userForm.get('experienceYears')!;

    if (role === 'DOCTOR') {
      contact.setValidators([Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]);
      hours.setValidators([Validators.maxLength(50)]);
      specs.setValidators([Validators.maxLength(200)]);
      expYrs.setValidators([Validators.min(0), Validators.max(100)]);
    } else {
      contact.clearValidators();
      hours.clearValidators();
      specs.clearValidators();
      expYrs.clearValidators();
    }

    [contact, hours, specs, expYrs].forEach(ctrl => ctrl.updateValueAndValidity({ onlySelf: true }));
  }

  private togglePasswordFields(isEdit: boolean) {
    const pw  = this.userForm.get('password')!;
    const cpw = this.userForm.get('confirmPassword')!;

    if (isEdit) {
      pw.clearValidators();
      cpw.clearValidators();
      this.userForm.clearValidators();
    } else {
      pw.setValidators([Validators.required, Validators.minLength(6)]);
      cpw.setValidators([Validators.required]);
      this.userForm.setValidators(this.passwordMatchValidator);
    }

    pw.updateValueAndValidity({ onlySelf: true });
    cpw.updateValueAndValidity({ onlySelf: true });
    this.userForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.userForm.value;
    const userData: any = {
      ...formValue,
      currentUsername: this.currentUsername,
      firstname: formValue.firstName,
      lastname: formValue.lastName,
      avatarUrl: formValue.avatarUrl
    };
console.log("userData",userData);
    if (this.isEditMode && this.currentUserId) {
      userData.id = this.currentUserId;
      this.userService.updateUseradmin(userData).subscribe({ next: () => this.handleSuccess(), error: err => this.handleError(err) });
    } else {
      this.userService.registerUser(userData).subscribe({ next: () => this.handleSuccess(), error: err => this.handleError(err) });
    }
  }

  private handleSuccess() {
    this.isLoading = false;
    this.userService.notifyDataChanged();

    const role = this.userService.getCurrentUserRole();
    console.log('handleSuccess(): current role =', role);

    if (role === 'ADMIN') {
      console.log('↪ navigating to /admin/usermanagment');
      this.router.navigate(['/admin/statistics']);
    } else if (role === 'DOCTOR') {
      console.log('↪ navigating to /doctor/patientList');
      this.router.navigate(['/doctor/patientList']);
    }
  }


  private handleError(error: any) {
    this.isLoading = false;
    this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
  }

  onCancel() {
    this.cancelled.emit();
    this.userForm.reset();
    this.isEditMode = false;
    const role = this.userService.getCurrentUserRole();
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

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match(/image-*/)) {
      this.uploadError = 'Please select a valid image file';
      return;
    }

    if (file.size > 2_097_152) {
      this.uploadError = 'File size must be less than 2MB';
      return;
    }

    this.uploadError = null;
    const fileName = file.name;
    const imagePath = `assets/img/${fileName}`;
    this.userForm.patchValue({ avatarUrl: imagePath });
  }
}
