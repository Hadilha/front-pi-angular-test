import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSpaceComponent } from './forum-space.component';

describe('ForumSpaceComponent', () => {
  let component: ForumSpaceComponent;
  let fixture: ComponentFixture<ForumSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumSpaceComponent]
    });
    fixture = TestBed.createComponent(ForumSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
