import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  workingHours = [
    { name: 'Monday - Thursday', hours: '8:00 AM - 6:00 PM' },
    { name: 'Friday', hours: '8:00 AM - 5:00 PM', highlight: true },
    { name: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { name: 'Sunday', hours: 'Closed', note: '(Emergency only)' }
  ];
}
