import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-card-settings-doctor",
  templateUrl: "./card-settings-doctor.component.html",
  styleUrls: ["./card-settings-doctor.css"],
})
export class CardSettingsDoctorComponent implements OnInit {
  credentialsForm: FormGroup;
  isLoading = false;
  originalUsername: string = '';
  errorMessage = '';
  currentusername: string = '';
  uploadError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router
  ) {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      currentPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      avatarUrl: ['', Validators.required],
      username: ['', Validators.required],
      contactNumber: ['', Validators.required],
      Specializations: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      workingHours: ['', Validators.required],
      accountStatus: ['ACTIVE'],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadUserData();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  loadUserData() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.originalUsername = user.username;
        this.currentusername = user.username;
        this.credentialsForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
          contactNumber: user.contactNumber,
          Specializations: user.Specializations,
          experienceYears: parseInt(user.experienceYears, 10),
          workingHours: user.workingHours,
          accountStatus: user.accountStatus || 'ACTIVE',
          password: '',
          confirmPassword: ''
        });
        console.log("user", user);

      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load user data';
      }
    });
  }
parseSpecializations(specs: string): string {
  const cleaned = specs.replace(/[\[\]']/g, '');
  return cleaned.split(', ').join(', ');
}

  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  onSubmit() {
    console.log('on submit clicked');
    console.log('Form valid:', this.credentialsForm.valid);
    if (this.credentialsForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    if (this.credentialsForm.value.password && this.credentialsForm.hasError('passwordMismatch')) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const formData = {
      currentUsername: this.originalUsername,
      ...this.credentialsForm.value,
      Specializations: this.credentialsForm.value.Specializations.split(',').map((s: string) => s.trim()),
      password: this.credentialsForm.value.password || undefined
    };

    this.userService.updateUserDoctor(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/doctor/patientList']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error.message || 'Failed to update profile';
        this.isLoading = false;
      }
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match(/image-*/)) {
      this.uploadError = 'Please select a valid image file';
      return;
    }

    if (file.size > 2097152) { // 2MB
      this.uploadError = 'File size must be less than 2MB';
      return;
    }

    this.uploadError = null;

    // Take only the filename and set the path manually
    const fileName = file.name;
    const imagePath = `assets/img/${fileName}`;

    this.credentialsForm.patchValue({ avatarUrl: imagePath });
  }

}
