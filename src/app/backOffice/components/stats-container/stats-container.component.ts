import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.css']
})
export class StatsContainerComponent {
  activeTab: 'comments' | 'posts' | 'reactions' = 'comments';

  setActiveTab(tab: 'comments' | 'posts' | 'reactions') {
    this.activeTab = tab;
  }
}
