import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreListUserComponent } from './score-list-user.component';

describe('ScoreListUserComponent', () => {
  let component: ScoreListUserComponent;
  let fixture: ComponentFixture<ScoreListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreListUserComponent]
    });
    fixture = TestBed.createComponent(ScoreListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
