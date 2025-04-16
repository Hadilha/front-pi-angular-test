import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProgramAjouterupdateComponent } from './content-program-ajouterupdate.component';

describe('ContentProgramAjouterupdateComponent', () => {
  let component: ContentProgramAjouterupdateComponent;
  let fixture: ComponentFixture<ContentProgramAjouterupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentProgramAjouterupdateComponent]
    });
    fixture = TestBed.createComponent(ContentProgramAjouterupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
