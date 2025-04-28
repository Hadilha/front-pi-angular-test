import { Component } from '@angular/core';
import { CoachingProgramService } from '../../services/coaching-program.service';
import { CoachingProgram } from '../../models/coaching-program.model';

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
