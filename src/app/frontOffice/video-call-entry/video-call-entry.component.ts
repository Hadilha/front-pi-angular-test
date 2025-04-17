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
      // Always use 'doctor' in the path, but pass the selected role as a query parameter
      const url = `/doctor/video-call/${this.roomId}?role=${this.selectedRole}`;
      this.router.navigateByUrl(url);
    } else {
      alert('Please enter a Room ID');
    }
  }
}