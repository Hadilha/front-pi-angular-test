import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Journal } from 'src/app/models/journal.model';
import { Mood } from 'src/app/models/mood.model';
import { JournalService } from 'src/app/Services/journal/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  journals: Journal[] = [];
  filteredJournals: Journal[] = [];
  selectedEntry: Journal | null = null;
  editingEntry: Journal | null = null;
  isLoading = false;
  errorMessage = '';
  selectedMood: string | null = null;
  calendarDays: any[] = [];
  moods = Object.values(Mood);
  entryForm: FormGroup;
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  constructor(
    private journalService: JournalService,
    private fb: FormBuilder
  ) {
    this.entryForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      mood: [Mood.Happy, Validators.required],
      entryDate: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateCalendarDays();
    this.loadJournals();
  }

  newEntry(): void {
    this.editingEntry = {
      id: undefined,
      title: '',
      content: '',
     // favorite:false,
      mood: Mood.Happy,
      entryDate: new Date(),
    };
    // Clear any previous form state
    this.entryForm.reset({
      title: '',
      content: '',
      mood: Mood.Happy,
      entryDate: new Date()
    });
  }


handleFilteredJournals(filtered: Journal[]) {
  this.filteredJournals = filtered;
}

onBack() {
  this.selectedEntry = null;
  this.loadJournals();
}

handleSaveSuccess() {
  this.editingEntry = null;
  this.loadJournals();
}




  private handleSaveError(error: any): void {
    console.error('Save error:', error);
    this.errorMessage = 'Failed to save entry. Please try again.';
  }

  cancelEdit(): void {
    this.editingEntry = null;
    this.selectedEntry = null;
    this.entryForm.reset();
  }
  loadEntriesForDay(day: any): void {
    this.selectedEntry = null;
    const dateString = day.date.toISOString().split('T')[0];
    this.filteredJournals = this.journals.filter(entry =>
      new Date(entry.entryDate).toISOString().split('T')[0] === dateString
    );
  }

  filterByMood(mood: string): void {
    this.selectedMood = this.selectedMood === mood ? null : mood;
    this.filteredJournals = this.selectedMood
      ? this.journals.filter(entry => entry.mood === this.selectedMood)
      : this.journals;
  }

  selectEntry(entry: Journal): void {
    this.selectedEntry = entry;
  }

  private generateCalendarDays(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.calendarDays = Array.from(
      { length: lastDay.getDate() },
      (_, i) => ({
        date: new Date(today.getFullYear(), today.getMonth(), i + 1),
        hasEntry: false
      })
    );
  }

  private loadJournals(): void {
    this.isLoading = true;
    this.journalService.getJournalsByUserId().subscribe({
      next: (journals) => {
        this.journals = journals;
        this.filteredJournals = journals;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load journals';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // Handle edit entry from show-journal component
onEditEntry(entry: Journal) {
  this.editingEntry = entry;
  this.initializeFormWithEntry(entry);
}

// Initialize form with existing entry data
private initializeFormWithEntry(entry: Journal) {
  this.entryForm.patchValue({
    title: entry.title,
    content: entry.content,
    mood: entry.mood,
    entryDate: new Date(entry.entryDate)
  });
}

// Unified save method
saveEntry() {
  if (this.entryForm.invalid) return;

  const journalEntry: Journal = {
    id: this.editingEntry?.id,
    ...this.entryForm.value
  };

  if (journalEntry.id) {
    this.journalService.updateJournal(journalEntry).subscribe({
      next: () => this.handleSaveSuccess(),
      error: (err) => this.handleSaveError(err)
    });
  }
}
}
