import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-card-profile-doctor",
  templateUrl: "./card-profile-doctor.component.html",
  styleUrls: ['./card-profile-doctor.css']

})
export class CardProfileDoctorComponent implements OnInit {

  ngOnInit(): void {}
  profileForm!: FormGroup;
  countries = ['United States', 'Canada', 'UK', 'Australia'];
  acceptedFileTypes = '.jpg,.jpeg,.png,.gif';

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      basicInfo: this.fb.group({
        profileImage: [''],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: [''],
        gender: [''],
        dob: [''],
        bio: ['']
      }),
      clinicInfo: this.fb.group({
        name: [''],
        address: [''],
        images: this.fb.array([])
      }),
      contactDetails: this.fb.group({
        address1: [''],
        address2: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: ['']
      }),
      services: this.fb.array([]),
      specializations: this.fb.array([]),
      education: this.fb.array([]),
      experience: this.fb.array([]),
      awards: this.fb.array([]),
      memberships: this.fb.array([]),
      registrations: this.fb.array([])
    });
  }

  // Add form array controls
  addService() {
    this.services.push(this.fb.control(''));
  }

  get services() {
    return this.profileForm.get('services') as FormArray;
  }

  // Similar methods for other form arrays...

  onFileSelected(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Submit logic
    }
  }
}
