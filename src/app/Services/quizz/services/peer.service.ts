import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Peer, { MediaConnection } from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  private peer: Peer | undefined;
  private mediaCall: MediaConnection | undefined;
  
  public currentStream = new BehaviorSubject<MediaStream | null>(null);
  public remoteStream = new BehaviorSubject<MediaStream | null>(null);

  constructor() { }

  initPeer(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.peer = new Peer(userId, {
          host: 'localhost',
          port: 9000,
          path: '/',
          debug: 2,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' }
            ]
          }
        });

        this.peer.on('open', () => {
          console.log('Peer connected:', this.peer?.id);
          resolve();
        });

        this.peer.on('error', (error) => {
          console.error('Peer error:', error);
          reject(error);
        });

        this.peer.on('call', (call) => {
          this.handleIncomingCall(call);
        });

        this.peer.on('disconnected', () => {
          console.warn('Peer disconnected, reconnecting...');
          this.peer?.reconnect();
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  private handleIncomingCall(call: MediaConnection): void {
    // End any existing call before handling the new incoming call
    if (this.mediaCall) {
      this.endCall();
    }
    this.mediaCall = call;
    this.setupCallEvents();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.currentStream.next(stream);
        call.answer(stream);
        console.log('Answered call from:', call.peer);
      })
      .catch(err => {
        console.error('Media access error:', err);
        call.close();
      });
  }

  callPeer(remotePeerId: string): void {
    if (!this.peer) {
      console.error('Peer not initialized');
      return;
    }

    // End any existing call before initiating a new outgoing call
    if (this.mediaCall) {
      this.endCall();
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.currentStream.next(stream);
        this.mediaCall = this.peer!.call(remotePeerId, stream);
        this.setupCallEvents();
      })
      .catch(err => {
        console.error('Media error:', err);
        setTimeout(() => this.callPeer(remotePeerId), 2000);
      });
  }

  private setupCallEvents(): void {
    if (!this.mediaCall) return;

    this.mediaCall.on('stream', (remoteStream) => {
      console.log('Received remote stream');
      this.remoteStream.next(remoteStream);
    });

    this.mediaCall.on('close', () => {
      console.log('Call closed');
      this.endCall();
    });

    this.mediaCall.on('error', (err) => {
      console.error('Call error:', err);
      this.endCall();
    });
  }

  endCall(): void {
    if (this.mediaCall) {
      this.mediaCall.close();
      this.mediaCall = undefined;
    }

    const stream = this.currentStream.value;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      this.currentStream.next(null);
    }

    this.remoteStream.next(null);
  }

  destroyPeer(): void {
    if (this.peer) {
      this.endCall();
      this.peer.destroy();
      this.peer = undefined;
    }
  }
}