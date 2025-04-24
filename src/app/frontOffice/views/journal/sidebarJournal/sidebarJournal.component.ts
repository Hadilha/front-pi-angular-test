import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Journal } from 'src/app/models/journal.model';
import { Mood } from 'src/app/models/mood.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JournalService } from 'src/app/Services/journal.service';

@Component({
  selector: 'app-sidebar-journal',
  templateUrl: './sidebarJournal.component.html',
  styleUrls: ['./sidebarJournal.component.css']
})
export class SidebarJournalComponent implements OnInit {
  @Input() calendarDays: any[] = [];
  @Input() journals: Journal[] = [];
  @Input() selectedMood: string | null = null;
  @Input() moods: string[] = [];
  @Output() daySelected = new EventEmitter<Date>();
  @Output() moodSelected = new EventEmitter<string>();
  @Output() filteredJournals = new EventEmitter<Journal[]>();
  @Input() selectedEntry: Journal | null = null;
  @Input() editingEntry: Journal | null = null;

  filterForm: FormGroup;
  showDateFilter = false;
  showTagFilter = false;
  availableTags: string[] = [];
  dateRange = { start: null, end: null };

  constructor(
    private fb: FormBuilder,
    private journalService: JournalService
  ) {
    this.filterForm = this.fb.group({
      mood: [''],
      tags: [[]],
      favorite: [false],
      dateRange: this.fb.group({
        start: [''],
        end: ['']
      }),
      searchQuery: ['']
    });
  }

  ngOnInit() {
    this.setupFilterListeners();
  }



  private setupFilterListeners() {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  toggleTagFilter(tag: string) {
    const tagsControl = this.filterForm.get('tags');
    if (tagsControl) {
      const currentTags = tagsControl.value as string[];
      if (currentTags.includes(tag)) {
        tagsControl.setValue(currentTags.filter(t => t !== tag));
      } else {
        tagsControl.setValue([...currentTags, tag]);
      }
    }
  }

  applyFilters() {
    const filters = this.filterForm.value;
    let filtered = [...this.journals];

    // Mood filter
    if (filters.mood) {
      filtered = filtered.filter(j => j.mood === filters.mood);
    }



    // Favorite filter
  //  if (filters.favorite) {
    // filtered = filtered.filter(j => j.favorite);
    //}

    // Date range filter
    if (filters.dateRange?.start || filters.dateRange?.end) {
      const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
      const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

      filtered = filtered.filter(j => {
        const entryDate = new Date(j.entryDate);
        return (!startDate || entryDate >= startDate) &&
               (!endDate || entryDate <= endDate);
      });
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(j =>
        j.title?.toLowerCase().includes(query) ||
        j.content?.toLowerCase().includes(query)
      );
    }

    this.filteredJournals.emit(filtered);
  }

  resetFilters() {
    this.filterForm.reset({
      mood: '',
      tags: [],
      favorite: false,
      dateRange: { start: '', end: '' },
      searchQuery: ''
    });
  }

  getMoodColor(mood: string): string {
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
