import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Prescription } from 'src/app/models/Prescription.model';
import { PerscriptionService } from 'src/app/services/perscription.service';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
// Register required components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-list-prescriptions',
  templateUrl: './list-prescriptions.component.html',
  styleUrls: ['./list-prescriptions.component.css'],
})
export class ListPrescriptionsComponent implements OnInit, OnDestroy {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';
  prescriptions: Prescription[] = [];
  prescriptionsStats: any;
  statsByAge: any;
  isLoading: boolean = true;
  notifications: any[] = [];
  unreadCount: number = 0;

  errorMessage: string = '';
  private stompClient: any;
  private isConnected: boolean = false;

  private sessionId: string | null = null;
  showNotifications: boolean = false;

  constructor(
    private prescriptionService: PerscriptionService,
    private router: Router,
      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
    this.fetchStats();
    this.isLoading = false;
    this.connectToNotifications();
    
    // Request notification permission on start
    
    // Trigger a manual check for expiring prescriptions after connection
    setTimeout(() => this.checkExpiringPrescriptions(), 2000);
  }

  ngOnDestroy(): void {
    this.disconnectNotifications();
  }

  
  
 

  disconnectNotifications() {
    if (this.stompClient && this.isConnected) {
      this.stompClient.disconnect();
      this.isConnected = false;
    }
  }

  checkExpiringPrescriptions() {
    // Only try if we have a valid connection
    if (this.isConnected && this.stompClient) {
      this.stompClient.send('/app/check-expiring-prescriptions', {}, JSON.stringify({}));
      console.log('Requested expiring prescriptions check');
    } else {
      console.log('Not connected, cannot check expiring prescriptions');
    }
  }

  showBrowserNotification(notification: any) {
    if (Notification.permission === 'granted') {
      const notif = new Notification('MindFull - Prescription Alert', {
        body: notification.message,
        icon: 'assets/icons/logo.png',
        badge: 'assets/icons/badge.png',
       // vibrate: [200, 100, 200]
      });
      
      notif.onclick = () => {
        window.focus();
        this.showNotifications = true;
      };
    }
  }
  
  connectToNotifications() {
    if (!this.isConnected) {
      const socket = new SockJS('http://localhost:8089/ws');
      this.stompClient = Stomp.over(socket);
  
      this.stompClient.connect(
        {},
        () => {
          this.isConnected = true;
          console.log('✅ Connected to STOMP');
  
          // Extract the true session ID (2nd-to-last segment)
          const transport = (socket as any)._transport;
          if (transport && transport.url) {
            const parts = transport.url.split('/');
            if (parts.length >= 2) {
              // ws://…/ws/{serverId}/{sessionId}/websocket
              this.sessionId = parts[parts.length - 2];
              console.log('🎯 Session ID:', this.sessionId);
            }
          }
  
          if (this.sessionId) {
            this.stompClient.subscribe(
              `/topic/notifications/${this.sessionId}`,
              (message: any) => {
                console.log('📩 Received message:', message);
                if (message.body) {
                  const notification = JSON.parse(message.body);
                  notification.read = false;
                  this.notifications.unshift(notification);
                  this.unreadCount++;
                  this.showBrowserNotification(notification);
                  this.cdr.detectChanges();
                }
              }
            );
          } else {
            console.error('❌ Could not determine sessionId from transport URL');
          }
        },
        (error: any) => {
          console.error('❌ Connection error:', error);
          setTimeout(() => this.connectToNotifications(), 5000);
        }
      );
    }
  }
  
  
  
  toggleNotificationList() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.markAllAsRead();
    }
  }
  
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.unreadCount = 0;
  }
  
  markAsRead(notification: any) {
    if (!notification.read) {
      notification.read = true;
      this.unreadCount = Math.max(0, this.unreadCount - 1);
    }
  }
  
  deleteNotification(index: number) {
    if (!this.notifications[index].read) {
      this.unreadCount--;
    }
    this.notifications.splice(index, 1);
  }
  
  clearAllNotifications() {
    this.notifications = [];
    this.unreadCount = 0;
  }
  
  fetchPrescriptions(): void {
    this.prescriptionService.getAllPrescriptions().subscribe({
      next: (data) => {
        this.prescriptions = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load prescriptions';
      },
    });
  }

  fetchStats(): void {
    this.prescriptionService.getStatistics().subscribe({
      next: (data) => {
        this.prescriptionsStats = data;
        console.log('Statistics fetched successfully', this.prescriptionsStats);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load stats';
      },
    });
  }

  navigateToCreate() {
    this.router.navigate([`doctor/add-prescription`]);
  }

  navigateToDetails(id: any) {
    this.router.navigate([`doctor/details-prescription/${id}`]);
  }

  navigateToUpdate(prescription: Prescription) {
    this.router.navigate([`doctor/update-prescription/${prescription.id}`]);
  }

  deletePrescription(id: any) {
    if (confirm('Are you sure you want to delete this prescription?')) {
      this.prescriptionService.deletePrescription(id).subscribe(() => {
        this.prescriptions = this.prescriptions.filter((p) => p.id !== id);
      });
    }
  }

  generatePrescriptionPDF(prescription: Prescription): void {
    const doc = new jsPDF();
    let y = 20;
    // Title
    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243); // #2196F3
    doc.text('Prescription Summary', 105, y, { align: 'center' });

    y += 10;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(0);

    // Author & Diagnosis
    doc.text(
      `Author: ${prescription.doctor?.fullName ?? 'Dr. Unknown'}`,
      30,
      y
    );
    y += 8;
    doc.text(`Diagnosis: ${prescription.diagnosis || '—'}`, 30, y);
    y += 8;
    doc.text(`Notes: ${prescription.notes || 'No notes provided'}`, 30, y);
    y += 8;

    const created = new Date(
      prescription.creationDate || new Date()
    ).toLocaleDateString('en-GB');
    const updated = new Date(
      prescription.updateDate || new Date()
    ).toLocaleDateString('en-GB');
    const expiration = new Date(
      prescription.expirationDate || new Date()
    ).toLocaleDateString('en-GB');

    y += 5;
    doc.setTextColor(100);
    doc.setFontSize(11);
    doc.text(`Created: ${created}`, 30, y);
    y += 6;
    doc.text(`Last Updated: ${updated}`, 30, y);
    y += 6;
    doc.text(`Expires: ${expiration}`, 30, y);

    y += 12;
    doc.setFillColor(242, 242, 242);
    doc.rect(20, y, 170, 10, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('#', 25, y + 7);
    doc.text('Name', 40, y + 7);
    doc.text('Directions', 100, y + 7);
    doc.text('Duration (Day)', 160, y + 7);

    y += 16;
    doc.setFontSize(11);
    prescription.listMedicaton.forEach((med, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${index + 1}`, 25, y);
      doc.text(med.medicationName || '-', 40, y);
      doc.text(med.directions || '-', 100, y);
      doc.text(med.duration.toString() || '0', 160, y);
      y += 8;
    });

    doc.save('prescription-summary.pdf');
  }

  ngAfterViewInit() {
    this.prescriptionService.getMedicationStatistics().subscribe({
      next: (data) => {
        this.statsByAge = data;
        console.log('Statistics fetched successfully', this.statsByAge);

        setTimeout(() => {
          let config: any = {
            type: 'bar',
            data: {
              labels: ['Infants', 'Adults', 'Elderly'],
              datasets: [
                {
                  label: String(new Date().getFullYear()),
                  backgroundColor: ['#ed64a6', '#4c51bf', '#38b2ac'],
                  borderColor: ['#ed64a6', '#4c51bf', '#38b2ac'],
                  data: [
                    10, 20, 30,
                    // this.statsByAge.Infants,
                    // this.statsByAge.Adults,
                    // this.statsByAge.Elderly,
                  ],
                  fill: false,
                  barThickness: 8,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                title: {
                  display: false,
                  text: 'Orders Chart',
                },
                legend: {
                  labels: {
                    color: 'rgba(0,0,0,.4)',
                  },
                  align: 'end',
                  position: 'bottom',
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
              },
              hover: {
                mode: 'nearest',
                intersect: true,
              },
              scales: {
                x: {
                  display: false,
                  title: {
                    display: true,
                    text: 'Month',
                  },
                  grid: {
                    borderDash: [2],
                    borderDashOffset: 2,
                    color: 'rgba(33, 37, 41, 0.3)',
                    drawBorder: true,
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: false,
                    text: 'Value',
                  },
                  grid: {
                    borderDash: [2],
                    borderDashOffset: 2,
                    color: 'rgba(33, 37, 41, 0.2)',
                    drawBorder: false,
                  },
                },
              },
            },
          };
          const canvas: any = document.getElementById('bar-chart');
          if (canvas) {
            const ctx = canvas.getContext('2d');
            new Chart(ctx, config);
          }
        }, 0);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load stats';
      },
    });
  }
}
