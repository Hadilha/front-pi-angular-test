import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: ForumPostFormComponent;
  let fixture: ComponentFixture<ForumPostFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumPostFormComponent]
    });
    fixture = TestBed.createComponent(ForumPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
