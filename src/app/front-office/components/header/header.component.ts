import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-front-office-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: true
    });

    // Add scroll event listener for header transparency
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 100) {
        header?.classList.remove('header-transparent');
      } else {
        header?.classList.add('header-transparent');
      }
    });

    // Mobile menu toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    mobileNavToggle?.addEventListener('click', () => {
      navbar?.classList.toggle('navbar-mobile');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });
  }
}