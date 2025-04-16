import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingprogramajouterUpdateComponent } from './coachingprogramajouter-update.component';

describe('CoachingprogramajouterUpdateComponent', () => {
  let component: CoachingprogramajouterUpdateComponent;
  let fixture: ComponentFixture<CoachingprogramajouterUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachingprogramajouterUpdateComponent]
    });
    fixture = TestBed.createComponent(CoachingprogramajouterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
