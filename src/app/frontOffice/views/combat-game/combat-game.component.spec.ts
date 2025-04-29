import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatGameComponent } from './combat-game.component';

describe('CombatGameComponent', () => {
  let component: CombatGameComponent;
  let fixture: ComponentFixture<CombatGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombatGameComponent]
    });
    fixture = TestBed.createComponent(CombatGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
