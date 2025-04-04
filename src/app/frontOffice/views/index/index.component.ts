import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",

})
export class IndexComponent implements OnInit {
  workingHours = [
    { name: 'Monday - Thursday', hours: '8:00 AM - 6:00 PM' },
    { name: 'Friday', hours: '8:00 AM - 5:00 PM', highlight: true },
    { name: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { name: 'Sunday', hours: 'Closed', note: '(Emergency only)' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
