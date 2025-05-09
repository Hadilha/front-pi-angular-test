import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProgramComponent } from './contentprogram.component';

describe('ContentProgramComponent', () => {
  let component: ContentProgramComponent;
  let fixture: ComponentFixture<ContentProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentProgramComponent]
    });
    fixture = TestBed.createComponent(ContentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
