import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFinderComponent } from './location-finder.component';

describe('LocationFinderComponent', () => {
  let component: LocationFinderComponent;
  let fixture: ComponentFixture<LocationFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationFinderComponent]
    });
    fixture = TestBed.createComponent(LocationFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
