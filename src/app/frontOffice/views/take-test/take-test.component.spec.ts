import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeTestComponent } from './take-test.component';

describe('TakeTestComponent', () => {
  let component: TakeTestComponent;
  let fixture: ComponentFixture<TakeTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeTestComponent]
    });
    fixture = TestBed.createComponent(TakeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
