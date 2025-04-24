import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardprofiladminComponent } from './cardprofiladmin.component';

describe('CardprofiladminComponent', () => {
  let component: CardprofiladminComponent;
  let fixture: ComponentFixture<CardprofiladminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardprofiladminComponent]
    });
    fixture = TestBed.createComponent(CardprofiladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
