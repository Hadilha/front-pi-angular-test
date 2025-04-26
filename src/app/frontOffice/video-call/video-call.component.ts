import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AiDoctorNoteService } from 'src/app/Services/ai-doctor-note.service';
import { PeerService } from 'src/app/Services/peer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { VideoCallService, VideoCall } from '../../Services/video-call.service';


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
  isGenerating = false;
  generatedNote = '';

  connectionTimeout: any;
  callRetryTimer: any;
  maxCallAttempts = 5;
  callAttempts = 0;
  statusUpdated = false;

  @ViewChild('localVideo') localVideoElement?: ElementRef;
  @ViewChild('remoteVideo') remoteVideoElement?: ElementRef;

  constructor(
    private aiService: AiDoctorNoteService,
    private route: ActivatedRoute,
    private router: Router,
    private videoCallService: VideoCallService,
    private peerService: PeerService
  ) {}



  ngOnInit(): void {
    const segments = this.router.url.split('/');
    this.isDoctor = segments.includes('doctor');
    console.log(`Role assigned: ${this.isDoctor ? 'doctor' : 'patient'}`);

    const roomIdParam = this.route.snapshot.paramMap.get('roomId');
    this.roomId = roomIdParam;

    if (!this.roomId) {
      const appointmentIdParam = this.route.snapshot.paramMap.get('appointmentId');
      const appointmentId = appointmentIdParam ? Number(appointmentIdParam) : null;

      if (appointmentId && !isNaN(appointmentId)) {
        this.setupVideoCallByAppointment(appointmentId);
      } else {
        this.navigateToEntry();
      }
    } else {
      this.setupVideoCallByRoomId(this.roomId);
    }

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

          if (this.connectionTimeout) clearTimeout(this.connectionTimeout);
          if (this.callRetryTimer) clearTimeout(this.callRetryTimer);
        }
      })
    );

    this.connectionTimeout = setTimeout(() => {
      if (this.callStatus === 'connecting') {
        console.warn('Connection attempt timed out after 30 seconds');
        alert('Connection timed out. Please try again.');
        this.navigateToEntry();
      }
    }, 30000);
  }

  navigateToEntry(): void {
    const path = this.isDoctor ? 'doctor/join-video-call' : 'patientspace/join-video-call';
    this.router.navigate([path]);
  }

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
        this.initializePeerConnection().then(() => this.initiateCall());
      },
      error: (error) => {
        console.error('Error creating video room:', error);
        alert('Failed to create video room. Please try again.');
        this.navigateToEntry();
      }
    });
  }

  setupVideoCallByRoomId(roomId: string): void {
    this.videoCallService.getVideoCallByRoomId(roomId).subscribe({
      next: (videoCall) => {
        this.videoCall = videoCall;
        this.appointmentId = videoCall.appointment.appointmentId;
        console.log(`Joined room with ID: ${roomId}`);
        this.initializePeerConnection().then(() => this.initiateCall());
      },
      error: (error) => {
        console.error('Error fetching video call:', error);
        alert('Invalid room ID. Please try again.');
        this.navigateToEntry();
      }
    });
  }

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
    return this.peerService.initPeer(userId).then(() => {
      console.log('Peer initialized successfully with ID:', userId);
    }).catch(error => {
      console.error('Error initializing peer:', error);
      alert('Failed to initialize video call. Please try again.');
      throw error;
    });
  }

  initiateCall(): void {
    if (!this.isDoctor) {
      const doctorPeerId = `doctor-${this.roomId}`;
      const retryDelay = 2000;

      const tryCall = () => {
        if (this.callStatus === 'active') return; // Already connected
        this.callAttempts++;
        console.log(`Patient calling doctor (Attempt ${this.callAttempts})`);
        this.peerService.callPeer(doctorPeerId);

        if (this.callAttempts < this.maxCallAttempts) {
          this.callRetryTimer = setTimeout(tryCall, retryDelay);
        } else {
          console.error('Max call attempts reached');
          alert('Unable to connect to doctor. Please try again.');
          this.navigateToEntry();
        }
      };

      setTimeout(tryCall, 1000);
    }
  }

  updateCallStatus(status: string): void {
    if (this.statusUpdated || !this.appointmentId) return;
    this.statusUpdated = true;
    this.videoCallService.updateVideoStatus(this.appointmentId, status).subscribe({
      next: () => console.log(`Call status updated to ${status}`),
      error: (error) => console.error('Error updating call status:', error)
    });
  }

  saveNotes(): void {
    if (this.isDoctor && this.appointmentId && this.consultationNotes.trim()) {
      // Create a Blob from the consultation notes text
      const blob = new Blob([this.consultationNotes], { type: 'text/plain' });
  
      // Create a link to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `consultation_notes_${this.appointmentId}.txt`; // Filename can be customized as needed
      link.click(); // Trigger the download
      console.log('Notes downloaded successfully');
    } else if (this.isDoctor && !this.consultationNotes.trim()) {
      alert('Please enter consultation notes before downloading.');
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
          this.navigateToEntry();
        },
        error: (error) => {
          console.error('Error ending call:', error);
          this.navigateToEntry();
        }
      });
    } else {
      this.navigateToEntry();
    }
  }

  ngOnDestroy(): void {
    if (this.connectionTimeout) clearTimeout(this.connectionTimeout);
    if (this.callRetryTimer) clearTimeout(this.callRetryTimer);

    this.peerService.endCall();
    this.peerService.destroyPeer();

    this.subscriptions.forEach(sub => sub.unsubscribe());

    if (this.callStatus !== 'ended' && this.appointmentId) {
      this.videoCallService.endVideoCall(this.appointmentId).subscribe();
    }
  }

  generateNoteWithAI(): void {
    if (!this.consultationNotes.trim()) {
      alert('Please enter patient summary first.');
      return;
    }

    this.isGenerating = true;
    this.aiService.generateDoctorNote(this.consultationNotes).subscribe({
      next: note => {
        this.generatedNote = note;
        this.consultationNotes = note;
        this.isGenerating = false;
      },
      error: err => {
        console.error(err);
        alert('Failed to generate note.');
        this.isGenerating = false;
      }
    });
  }

}
