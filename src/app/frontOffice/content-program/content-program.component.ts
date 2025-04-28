import { Component, OnInit } from '@angular/core';
import { ProgramContentService } from 'src/app/services/content-program.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-program',
  templateUrl: './content-program.component.html',
  styleUrls: ['./content-program.component.css']
})
export class ContentProgramComponent implements OnInit {
    programContents: any[] = [];
    isLoading: boolean = true;
    showFeedbackForm: boolean = false;
    selectedContent: any = null;
    feedback = {
      rating: 0,
      comment: '',
      coachId: 2, // Changed from 'coach' to 'coachId'
      patientId: 1,
      contentId: 0
    };

    constructor(
      private programContentService: ProgramContentService,
      private sanitizer: DomSanitizer,
      private feedbackService: FeedbackService,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.loadProgramContents();
    }

    sanitizeUrl(url: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    loadProgramContents(): void {
      this.programContentService.getProgramContents().subscribe({
        next: (data) => {
          console.log('Contents loaded:', data);
          this.programContents = data.map(item => {
            const link = item.mediaLink?.toLowerCase();
            let mediaType = 'iframe';
            
            if (link?.endsWith('.mp4')) {
              mediaType = 'video';
            } else if (link?.endsWith('.jpg') || link?.endsWith('.png') || 
                     link?.endsWith('.jpeg') || link?.endsWith('.gif')) {
              mediaType = 'image';
            } else if (link?.includes('youtube') || link?.includes('vimeo')) {
              mediaType = 'iframe';
            }

            return { 
              ...item, 
              mediaType,
              coachId: item.coachId || 2 // Ensure coachId exists
            };
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading program content data', error);
          this.isLoading = false;
        }
      });
    }

    getSafeMediaUrl(link: string, type: string): SafeResourceUrl {
      if (type === 'iframe' && (link.includes('youtube.com') || link.includes('youtu.be'))) {
        const videoId = this.extractYouTubeVideoId(link);
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl(link);
    }
    
    extractYouTubeVideoId(url: string): string {
      const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
        /(?:https?:\/\/)?youtu\.be\/([^?]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/
      ];
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      return '';
    }
    toggleFeedbackForm(content: any): void {
      this.selectedContent = content;
      this.feedback.contentId = content.contentId;
      this.feedback.coachId = content.coachId || 2; // Use content's coachId or default
      this.showFeedbackForm = !this.showFeedbackForm;
    }

    submitFeedback(): void {
      if (!this.feedback.rating || !this.feedback.comment.trim()) {
        alert('Please fill all required fields (rating and comment).');
        return;
      }

      if (!this.feedback.contentId) {
        console.error('Content ID is missing');
        alert('No content selected for feedback.');
        return;
      }

      // Create the payload with only necessary fields
      const feedbackPayload = {
        rating: this.feedback.rating,
        comment: this.feedback.comment,
        coachId: this.feedback.coachId // Send just the ID
      };

      this.feedbackService.addFeedback(
        feedbackPayload,
        this.feedback.patientId,
        this.feedback.contentId
      ).subscribe({
        next: (res) => {
          console.log("Feedback submitted successfully", res);
          this.showFeedbackForm = false;
          this.resetFeedbackForm();
          alert('Thank you for your feedback!');
        },
        error: (err) => {
          console.error("Error submitting feedback", err);
          alert('Error submitting feedback. Please try again.');
        }
      });
    }


    resetFeedbackForm(): void {
      this.feedback = {
        rating: 0,
        comment: '',
        coachId: this.selectedContent?.coachId || 2,
        patientId: 1,
        contentId: this.selectedContent?.contentId || 0
      };
    }
}