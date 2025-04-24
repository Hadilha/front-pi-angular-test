import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Journal } from 'src/app/models/journal.model';
import { Mood } from 'src/app/models/mood.model';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent {
  @Input() entries: Journal[] = [];
  @Output() entrySelected = new EventEmitter<Journal>();

  getMoodColor(mood: Mood): string {
    const colors: { [key: string]: string } = {
      [Mood.Happy]: '#4ade80',
      [Mood.Sad]: '#60a5fa',
      [Mood.Angry]: '#f87171',
      [Mood.Excited]: '#fbbf24',
      [Mood.Bored]: '#94a3b8',
      [Mood.Anxious]: '#fb7185'
    };
    return colors[mood] || '#94a3b8';
  }
}
