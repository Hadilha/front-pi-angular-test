import { Component ,OnInit } from '@angular/core';
import { ProgramContentService } from 'src/app/services/content-program.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-content-program',
  templateUrl: './content-program.component.html',
  styleUrls: ['./content-program.component.css']
})
export class ContentProgramComponent implements OnInit {
  programContents: any[] = [];
  isLoading: boolean = true;
  constructor(private programContentService: ProgramContentService
              , private sanitizer: DomSanitizer // Injecting DomSanitizer for URL sanitization
  ) {}

  ngOnInit(): void {
    this.loadProgramContents();
  }

  // Méthode pour sécuriser les URLs des iframes
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Charger les contenus de programme depuis le service
  loadProgramContents(): void {
    this.programContentService.getProgramContents().subscribe({
      next: (data) => {
        this.programContents = data.map(item => {
          const link = item.mediaLink?.toLowerCase();
  
          let mediaType = 'iframe'; // Default to iframe
          if (link?.endsWith('.mp4')) {
            mediaType = 'video';
          } else if (link?.endsWith('.jpg') || link?.endsWith('.png') || link?.endsWith('.jpeg') || link?.endsWith('.gif')) {
            mediaType = 'image';
          } else if (link?.includes('youtube') || link?.includes('vimeo')) {
            mediaType = 'iframe';
          }
  
          return { ...item, mediaType };
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
    if (type === 'iframe' && link.includes('youtube.com/watch')) {
      const videoId = this.extractYouTubeVideoId(link);
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  
  extractYouTubeVideoId(url: string): string {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    return match && match[1] ? match[1] : '';
  }
  
}
