import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var L: any; // Leaflet.js declaration

interface HospitalLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  city: string;
}

@Component({
  selector: 'app-location-finder',
  templateUrl: './location-finder.component.html',
  styleUrls: ['./location-finder.component.css']
})
export class LocationFinderComponent implements OnInit {

  allLocations: HospitalLocation[] = [
    {
      id: 1,
      name: 'Tunis Medical Center',
      address: '45 Avenue Habib Bourguiba, Tunis',
      phone: '+216 70 123 456',
      lat: 36.8065,
      lng: 10.1815,
      city: 'Tunis'
    },
    {
      id: 2,
      name: 'Sousse General Hospital',
      address: 'Rue de la Corniche, Sousse',
      phone: '+216 73 234 567',
      lat: 35.8254,
      lng: 10.6369,
      city: 'Sousse'
    }
  ];




  ngOnInit(): void {

  }




}
