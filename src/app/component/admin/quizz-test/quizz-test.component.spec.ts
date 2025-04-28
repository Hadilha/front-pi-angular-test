import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTestComponent } from './quizz-test.component';

describe('QuizzTestComponent', () => {
  let component: QuizTestComponent;
  let fixture: ComponentFixture<QuizTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTestComponent]
    });
    fixture = TestBed.createComponent(QuizTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
