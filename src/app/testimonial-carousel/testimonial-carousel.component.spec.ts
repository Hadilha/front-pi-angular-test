import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCarouselComponent } from './testimonial-carousel.component';

describe('TestimonialCarouselComponent', () => {
  let component: TestimonialCarouselComponent;
  let fixture: ComponentFixture<TestimonialCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialCarouselComponent]
    });
    fixture = TestBed.createComponent(TestimonialCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
