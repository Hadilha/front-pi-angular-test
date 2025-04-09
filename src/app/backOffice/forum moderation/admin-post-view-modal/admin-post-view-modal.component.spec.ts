import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostViewModalComponent } from './admin-post-view-modal.component';

describe('AdminPostViewModalComponent', () => {
  let component: AdminPostViewModalComponent;
  let fixture: ComponentFixture<AdminPostViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostViewModalComponent]
    });
    fixture = TestBed.createComponent(AdminPostViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
