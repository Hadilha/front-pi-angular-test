import { Component, Input, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() appName = 'My App';
  @Input() isLoggedIn = false;
  @Input() userName = 'John Doe';
  @Input() iserId = 1;

  isMobileView = false;
  menuOpen = false;
  mobileBreakpoint = 768;

  ngOnInit() {
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= this.mobileBreakpoint;
    if (!this.isMobileView) {
      this.menuOpen = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  login() {
    // Implement login logic
    console.log('Login clicked');
  }
}