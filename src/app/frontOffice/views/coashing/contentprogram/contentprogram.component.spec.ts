import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentprogramComponent } from './contentprogram.component';

describe('ContentprogramComponent', () => {
  let component: ContentprogramComponent;
  let fixture: ComponentFixture<ContentprogramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentprogramComponent]
    });
    fixture = TestBed.createComponent(ContentprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
