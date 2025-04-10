import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListUserComponent } from './quiz-list-user.component';

describe('QuizListUserComponent', () => {
  let component: QuizListUserComponent;
  let fixture: ComponentFixture<QuizListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizListUserComponent]
    });
    fixture = TestBed.createComponent(QuizListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
