import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingPuzzleComponent } from './sliding-puzzle.component';

describe('SlidingPuzzleComponent', () => {
  let component: SlidingPuzzleComponent;
  let fixture: ComponentFixture<SlidingPuzzleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlidingPuzzleComponent]
    });
    fixture = TestBed.createComponent(SlidingPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
