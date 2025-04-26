import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailModalComponent } from './post-detail-modal.component';

describe('PostDetailModalComponent', () => {
  let component: PostDetailModalComponent;
  let fixture: ComponentFixture<PostDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailModalComponent]
    });
    fixture = TestBed.createComponent(PostDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
