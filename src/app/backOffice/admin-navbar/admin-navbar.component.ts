import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
})
export class AdminNavbarComponent implements OnInit {
  keyword: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  notifications: any[] = [];
  showNotifications = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNotifications(); // Charger dès que le coach ouvre sa page
  }

  onSearch() {
    this.searchEvent.emit(this.keyword);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      this.loadNotifications(); // Recharger la liste quand on clique sur la cloche
    }
  }

  loadNotifications() {
    this.http.get<string[]>('http://localhost:8089/feedback/notifications')
      .subscribe(
        (data) => {
          this.notifications = data.map(message => ({ message }));
        },
        (error) => {
          console.error('Erreur lors du chargement des notifications', error);
        }
      );
  }
}
