import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingProgramAjouterUpdateComponent } from './coachingprogramajouter-update.component';

describe('CoachingProgramajouterUpdateComponent', () => {
  let component: CoachingProgramAjouterUpdateComponent;
  let fixture: ComponentFixture<CoachingProgramAjouterUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachingProgramAjouterUpdateComponent]
    });
    fixture = TestBed.createComponent(CoachingProgramAjouterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
