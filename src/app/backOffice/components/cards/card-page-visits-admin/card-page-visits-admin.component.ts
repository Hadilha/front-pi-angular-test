import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-card-page-visits-admin',
  templateUrl: './card-page-visits-admin.component.html',
  styleUrls: ['./card-page-visits-admin.component.css']
})
export class CardPageVisitsAdminComponent implements OnInit {
  doctorName: string = 'Dr. Alice Brown';  // Default doctor
  patients: any[] = [];  // Array to store the list of patients
  doctors: any[] = [];  // Array to store the list of doctors

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getDoctors();
    this.getPatientsPerDoctor();  // Fetch the patients for the default doctor
  }
  onDoctorSelect(event: any) {
    this.doctorName = event.target.value;  // Set the selected doctor's name
    this.getPatientsPerDoctor();  // Fetch patients for the selected doctor
  }

  getDoctors() {
    this.userService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      console.log("Doctors List:", this.doctors);  // Check if the doctors array is populated
    });
  }


  // Method to fetch the list of patients for the selected doctor
  getPatientsPerDoctor() {
    this.userService.getPatientsPerDoctor(this.doctorName).subscribe((patients) => {
      this.patients = patients;  // Set the response list in the variable
    });
  }
}
