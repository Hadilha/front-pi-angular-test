import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-call-entry',
  templateUrl: './video-call-entry.component.html',
  styleUrls: ['./video-call-entry.component.css']
})
export class VideoCallEntryComponent {
  selectedRole: string = 'doctor'; // Default role
  roomId: string = ''; // Room ID input

  constructor(private router: Router) {}

  joinCall() {
    if (this.roomId) {
      const path = this.selectedRole === 'doctor' ? 'doctor' : 'patientspace';
      this.router.navigate([`/${path}/video-call/${this.roomId}`]);
    } else {
      alert('Please enter a Room ID');
    }
  }
}