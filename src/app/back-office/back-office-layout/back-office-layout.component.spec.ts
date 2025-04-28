import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeLayoutComponent } from './back-office-layout.component';

describe('BackOfficeLayoutComponent', () => {
  let component: BackOfficeLayoutComponent;
  let fixture: ComponentFixture<BackOfficeLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackOfficeLayoutComponent]
    });
    fixture = TestBed.createComponent(BackOfficeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
