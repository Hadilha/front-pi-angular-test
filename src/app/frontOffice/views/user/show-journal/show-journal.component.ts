import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Journal } from 'src/app/models/journal.model';
import { Mood } from 'src/app/models/mood.model';
import { JournalService } from 'src/app/Services/journal/journal.service';

@Component({
  selector: 'app-show-journal',
  templateUrl: './show-journal.component.html',
  styleUrls: ['./show-journal.component.css']
})
export class ShowJournalComponent {
  @Input() entry!: Journal;
  @Output() back = new EventEmitter<void>();
  @Output() editEntry = new EventEmitter<any>();

  constructor(private journalService: JournalService) { }


 // In show-journal.component.ts
getMoodColor(mood: Mood): string {
  const colors = {
    [Mood.Happy]: '#4ade80',
    [Mood.Sad]: '#60a5fa',
    [Mood.Angry]: '#f87171',
    [Mood.Excited]: '#fbbf24',
    [Mood.Bored]: '#94a3b8',
    [Mood.Anxious]: '#fb7185'  // Updated to match enum
  };
  return colors[mood] || '#94a3b8';
}
  deleteJournalEntry(id: number) {
    this.journalService.deleteEntry(id).subscribe({
      next: () => {
        this.handleSuccess();
        this.back.emit();  // Emit back event
      },
      error: (err) => this.handleError(err)
    });
  }


  handleSuccess(): void {
    console.log('Journal entry deleted successfully.');
  }
  handleError(err: any): void {
    console.error('An error occurred:', err);
  }
  onEdit(entry: Journal) {
    this.editEntry.emit(entry);
    this.back.emit();
  }

}
