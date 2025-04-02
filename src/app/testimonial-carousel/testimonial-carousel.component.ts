import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial-carousel',
  templateUrl: './testimonial-carousel.component.html',
  styleUrls: ['./testimonial-carousel.component.css']
})
export class TestimonialCarouselComponent {
  currentIndex = 0;
  testimonials = [
    {
      quote: "After 10 years of struggling with anxiety, the CBT program at Mindfull finally gave me tools that worked. My therapist understood exactly what I needed.",
      name: "Emma R.",
      title: "Anxiety Management",
      image: "avatar1.png"
    },
    {
      quote: "The 24/7 chat support literally saved me during a crisis. Knowing help was always available made recovery possible.",
      name: "David T.",
      title: "Depression Treatment",
      image: "avatar2.png"
    },
    {
      quote: "Group therapy helped me realize I wasn't alone. The community here understands what my friends and family couldn't.",
      name: "Sophia K.",
      title: "PTSD Recovery",
      image: "avatar3.png"
    },
    {
      quote: "Medication management combined with therapy made all the difference. The psychiatrists here actually listen.",
      name: "Michael L.",
      title: "Bipolar Treatment",
      image: "avatar4.png"
    }

  ];

  ngOnInit() {

  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
