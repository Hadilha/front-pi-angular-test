// src/app/frontoffice/video-call/video-call.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoCallService, VideoCall } from '../../services/video-call.service';
import { PeerService } from 'src/app/services/peer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
  roomId: string | null = null;
  videoCall: VideoCall | null = null;
  isDoctor = false;
  appointmentId: number | null = null;
  localStream: MediaStream | null = null;
  remoteStream: MediaStream | null = null;
  subscriptions: Subscription[] = [];
  callStatus = 'connecting'; // connecting, active, ended
  consultationNotes = '';
  connectionTimeout: any;

  // For accessing video elements directly
  @ViewChild('localVideo') localVideoElement?: ElementRef;
  @ViewChild('remoteVideo') remoteVideoElement?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoCallService: VideoCallService,
    private peerService: PeerService
  ) { }

  navigateToVideoCalls(): void {
    this.router.navigate(['doctor/video-calls']);
  }

  ngOnInit(): void {
    // For testing, use URL parameter to determine role consistently
    const roleParam = this.route.snapshot.queryParamMap.get('role');
    if (roleParam === 'doctor') {
      this.isDoctor = true;
    } else if (roleParam === 'patient') {
      this.isDoctor = false;
    } else {
      // Default assignment if no role param (for production you'd use auth service)
      // This approach ensures consistent behavior in both development and production
      this.isDoctor = this.route.snapshot.queryParamMap.get('role') === 'doctor';
    }

    console.log(`Role assigned: ${this.isDoctor ? 'doctor' : 'patient'}`);

    const roomIdParam = this.route.snapshot.paramMap.get('roomId');
    this.roomId = roomIdParam;
    
    if (!this.roomId) {
      // If no roomId, try to get from appointmentId
      const appointmentIdParam = this.route.snapshot.paramMap.get('appointmentId');
      const appointmentId = appointmentIdParam ? Number(appointmentIdParam) : null;
      
      if (appointmentId && !isNaN(appointmentId)) {
        this.setupVideoCallByAppointment(appointmentId);
      } else {
        this.router.navigate(['/appointments']);
      }
    } else {
      this.setupVideoCallByRoomId(this.roomId);
    }

    // Subscribe to streams
    this.subscriptions.push(
      this.peerService.currentStream.subscribe(stream => {
        this.localStream = stream;
        this.attachStreamToVideo('local');
      }),
      
      this.peerService.remoteStream.subscribe(stream => {
        this.remoteStream = stream;
        this.attachStreamToVideo('remote');
        
        if (stream) {
          this.callStatus = 'active';
          this.updateCallStatus('ACTIVE');
          // Clear connection timeout if connection succeeds
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
          }
        }
      })
    );

    // Setup timeout for connection attempts
    this.connectionTimeout = setTimeout(() => {
      if (this.callStatus === 'connecting') {
        console.warn('Connection attempt timed out after 30 seconds');
        // Optional: Show timeout message to user
      }
    }, 30000);
  }

  // Helper method to attach streams to video elements
  attachStreamToVideo(streamType: 'local' | 'remote'): void {
    if (streamType === 'local' && this.localVideoElement && this.localStream) {
      this.localVideoElement.nativeElement.srcObject = this.localStream;
    } else if (streamType === 'remote' && this.remoteVideoElement && this.remoteStream) {
      this.remoteVideoElement.nativeElement.srcObject = this.remoteStream;
    }
  }

  setupVideoCallByAppointment(appointmentId: number): void {
    this.appointmentId = appointmentId;
    this.videoCallService.createVideoRoom(appointmentId).subscribe({
      next: (response) => {
        this.roomId = response.roomId;
        console.log(`Room created with ID: ${this.roomId}`);
        
        this.initializePeerConnection()
          .then(() => {
            if (!this.isDoctor) {
              const doctorPeerId = `doctor-${this.roomId}`;
              let attempts = 0;
              const maxAttempts = 5;
              const retryDelay = 2000; // 2 seconds between retries
  
              const tryCall = () => {
                attempts++;
                console.log(`Patient calling doctor (Attempt ${attempts})`);
                this.peerService.callPeer(doctorPeerId);
  
                if (attempts < maxAttempts) {
                  setTimeout(tryCall, retryDelay);
                } else {
                  console.error('Max call attempts reached');
                  // Optionally update UI to inform user
                }
              };
  
              // Initial call attempt after a short delay
              setTimeout(tryCall, 1000);
            }
          })
          .catch(error => {
            console.error('Peer initialization failed:', error);
          });
      },
      error: (error) => console.error('Error creating video room:', error)
    });
  }

  setupVideoCallByRoomId(roomId: string): void {
    this.videoCallService.getVideoCallByRoomId(roomId).subscribe({
      next: (videoCall) => {
        this.videoCall = videoCall;
        this.appointmentId = videoCall.appointment.appointmentId;
        console.log(`Joined room with ID: ${roomId}`);
        
        this.initializePeerConnection()
          .then(() => {
            if (!this.isDoctor) {
              const doctorPeerId = `doctor-${this.roomId}`;
              let attempts = 0;
              const maxAttempts = 5;
              const retryDelay = 2000;
  
              const tryCall = () => {
                attempts++;
                console.log(`Patient calling doctor (Attempt ${attempts})`);
                this.peerService.callPeer(doctorPeerId);
  
                if (attempts < maxAttempts) {
                  setTimeout(tryCall, retryDelay);
                } else {
                  console.error('Max call attempts reached');
                }
              };
  
              setTimeout(tryCall, 1000);
            }
          })
          .catch(error => console.error('Peer init failed:', error));
      },
      error: (error) => console.error('Error fetching video call:', error)
    });
  }
  // Generate a consistent user ID based on room ID and role
  generateUserId(): string {
    if (!this.roomId) {
      console.error('Cannot generate user ID: Room ID is null');
      return `${this.isDoctor ? 'doctor' : 'patient'}-unknown`;
    }
    return `${this.isDoctor ? 'doctor' : 'patient'}-${this.roomId}`;
  }

  initializePeerConnection(): Promise<void> {
    const userId = this.generateUserId();
    console.log(`Initializing peer with ID: ${userId}`);
    
    return this.peerService.initPeer(userId)
      .then(() => {
        console.log('Peer initialized successfully with ID:', userId);
      })
      .catch(error => {
        console.error('Error initializing peer:', error);
        throw error; // Re-throw to handle in the caller
      });
  }
  updateCallStatus(status: string): void {
    if (this.appointmentId) {
      this.videoCallService.updateVideoStatus(this.appointmentId, status).subscribe({
        next: () => console.log(`Call status updated to ${status}`),
        error: (error) => console.error('Error updating call status:', error)
      });
    }
  }

  saveNotes(): void {
    if (this.isDoctor && this.appointmentId) {
      this.videoCallService.saveNotes(this.appointmentId, this.consultationNotes).subscribe({
        next: () => console.log('Consultation notes saved'),
        error: (error) => console.error('Error saving notes:', error)
      });
    }
  }

  endCall(): void {
    this.callStatus = 'ended';
    this.peerService.endCall();
    
    if (this.appointmentId) {
      this.videoCallService.endVideoCall(this.appointmentId).subscribe({
        next: () => {
          console.log('Call ended successfully');
          if (this.isDoctor) {
            this.saveNotes();
          }
          setTimeout(() => this.router.navigate(['/doctor/join-video-call']), 3000);
        },
        error: (error) => console.error('Error ending call:', error)
      });
    }
  }

  ngOnDestroy(): void {
    // Clear timeout if component is destroyed
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
    }
    
    this.peerService.endCall();
    this.peerService.destroyPeer();
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    // Make sure call is ended properly
    if (this.callStatus !== 'ended' && this.appointmentId) {
      this.videoCallService.endVideoCall(this.appointmentId).subscribe();
    }
  }
}