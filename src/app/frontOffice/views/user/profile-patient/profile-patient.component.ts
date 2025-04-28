import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.css']
})
export class ProfilePatientComponent {
  showJournal: boolean = false;
  showCredentials: boolean = false;
  user!: User;
  isLoading = true;
  errorMessage = '';


  constructor(private userService: UserService, private Router:Router) {}
  ngOnInit(): void {
    this.loadUserData();
  }

  toggleJournal() {
    this.showJournal = !this.showJournal;
    this.showCredentials = false; // Close credentials if journal is opened
    this.Router.navigate(['/patientspace/journal']);

  }

  toggleCredentials() {
    this.showCredentials = !this.showCredentials;
    this.showJournal = false; // Close journal if credentials are opened
  }
   loadUserData(): void {
    this.userService.getCurrentUserpatient().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
console.log('User data loaded:', user);
      },

      error: (err) => {
        this.errorMessage = 'Failed to load user data';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
  navigateToCredentials() {
    this.Router.navigate(['/patientspace/credentials']);
  }

}
