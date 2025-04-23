import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.css']
})
export class StatsContainerComponent {
  showCommentsCharts = true;

  toggleCharts(type: 'comments' | 'posts') {
    this.showCommentsCharts = type === 'comments';
  }
}
