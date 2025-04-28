import { Component, Input, Output, EventEmitter,SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Journal } from 'src/app/models/journal.model';
import { Mood } from 'src/app/models/mood.model';
import { JournalService } from 'src/app/Services/journal/journal.service';

@Component({
  selector: 'app-update-journal',
  templateUrl: './update-journal.component.html',
  styleUrls: ['./update-journal.component.css']
})
export class UpdateJournalComponent {
  @Input() entryForm!: FormGroup;
  @Input() moods: string[] = [];
  @Input() quillConfig: any;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() selectedEntry: Journal | null = null;
  @Input() editingEntry: Journal | null = null;
  errorMessage: string = '';
    private selectionRange: Range | null = null;
    isSubmitting = false;
    sanitizedContent: any;
  constructor(
    private sanitizer: DomSanitizer,
    private journalService: JournalService
  ) {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
      this.entryForm?.get('content')?.value || ''
    );
  }

onSubmit() {
  if (this.entryForm.valid) {
    this.save.emit();
  }
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

getMoodIcon(mood: string): string {
  return {
    [Mood.Happy]: 'fas fa-smile',
    [Mood.Sad]: 'fas fa-sad-tear',
    [Mood.Angry]: 'fas fa-angry',
    [Mood.Excited]: 'fas fa-grin-stars',
    [Mood.Bored]: 'fas fa-meh',
    [Mood.Anxious]: 'fas fa-flushed'
  }[mood] || 'fas fa-question';
}
 // Selection handling methods
 saveSelection() {
  const selection = window.getSelection();
  this.selectionRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
}

restoreSelection() {
  const selection = window.getSelection();
  if (selection && this.selectionRange) {
    selection.removeAllRanges();
    selection.addRange(this.selectionRange);
  }
}

formatText(command: string) {
  this.saveSelection();
  document.execCommand(command, false);
  this.restoreSelection();
  this.focusEditor();
}

focusEditor() {
  const editor = document.querySelector('.custom-editor') as HTMLElement;
  editor?.focus();
}
 onEditorInput(event: Event) {
    const target = event.target as HTMLElement;
    const content = target.innerHTML;

    this.entryForm.patchValue({
      content: this.sanitizer.sanitize(SecurityContext.HTML, content)
    });

  }
}
