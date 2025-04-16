import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingprogramComponent } from './coachingprogram.component';

describe('CoachingprogramComponent', () => {
  let component: CoachingprogramComponent;
  let fixture: ComponentFixture<CoachingprogramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachingprogramComponent]
    });
    fixture = TestBed.createComponent(CoachingprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
