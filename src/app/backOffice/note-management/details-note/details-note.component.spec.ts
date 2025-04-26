import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNoteComponent } from './details-note.component';

describe('DetailsNoteComponent', () => {
  let component: DetailsNoteComponent;
  let fixture: ComponentFixture<DetailsNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsNoteComponent]
    });
    fixture = TestBed.createComponent(DetailsNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
