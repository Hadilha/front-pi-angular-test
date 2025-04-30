import { Component } from '@angular/core';
import { CoachingProgram } from 'src/app/models/coaching-program.model';
import { CoachingProgramService } from 'src/app/Services/coaching-program/coaching-program.service';

@Component({
  selector: 'app-search-program',
  templateUrl: './search-program.component.html',
  styleUrls: ['./search-program.component.css']
})
export class SearchProgramComponent {
  keyword = '';
  programs: CoachingProgram[] = [];

  constructor(private coachingProgramService: CoachingProgramService) {}

  search(): void {
    if (this.keyword.trim() !== '') {
      this.coachingProgramService.searchPrograms(this.keyword).subscribe(data => {
        this.programs = data;
      });
    }
  }
}
