import { Component ,OnInit } from '@angular/core';
import { ProgramContentService } from 'src/app/services/content-program.service';

@Component({
  selector: 'app-content-program',
  templateUrl: './content-program.component.html',
  styleUrls: ['./content-program.component.css']
})
export class ContentProgramComponent implements OnInit {
  programContents: any[] = [];
  isLoading: boolean = true;
  constructor(private programContentService: ProgramContentService) {}

  ngOnInit(): void {
    this.loadProgramContents();
  }

  // Charger les contenus de programme depuis le service
  loadProgramContents(): void {
    this.programContentService.getProgramContents().subscribe({
      next: (data) => {
        this.programContents = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading program content data', error);
        this.isLoading = false;
      }
    });
  }

}
