import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProgramComponent } from './search-program.component';

describe('SearchProgramComponent', () => {
  let component: SearchProgramComponent;
  let fixture: ComponentFixture<SearchProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProgramComponent]
    });
    fixture = TestBed.createComponent(SearchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
