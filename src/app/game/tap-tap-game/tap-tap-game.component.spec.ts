import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapTapGameComponent } from './tap-tap-game.component';

describe('TapTapGameComponent', () => {
  let component: TapTapGameComponent;
  let fixture: ComponentFixture<TapTapGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapTapGameComponent]
    });
    fixture = TestBed.createComponent(TapTapGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
