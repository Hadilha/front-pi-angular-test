import { Component, Input, Output, EventEmitter, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Mood } from 'src/app/models/mood.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JournalService } from 'src/app/Services/journal/journal.service';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent {
  @Input() entryForm!: FormGroup;
  @Input() moods: Mood[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  sanitizedContent: any;
  errorMessage: string | null = null;
  isSubmitting = false;
  private selectionRange: Range | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private journalService: JournalService
  ) {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
      this.entryForm?.get('content')?.value || ''
    );
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

  onEditorInput(event: Event) {
    const target = event.target as HTMLElement;
    const content = target.innerHTML;

    this.entryForm.patchValue({
      content: this.sanitizer.sanitize(SecurityContext.HTML, content)
    });

  }
  onCancel() {
    this.cancel.emit();
    this.entryForm.reset();
  }
  onSubmit() {
    this.errorMessage = null;
    this.isSubmitting = true;

    if (this.entryForm.valid) {
      const formData = {
        title: this.entryForm.value.title,
        content: this.entryForm.value.content,
        mood: this.entryForm.value.mood,
        entryDate: this.entryForm.value.entryDate
      };

      this.journalService.createJournalEntry(formData)
        .pipe(
          catchError(error => {
            this.handleError(error);
            return throwError(() => error);
          })
        )
        .subscribe({
          next: (response) => {
            this.handleSuccess(response);
          },
          error: () => this.isSubmitting = false
        });
    } else {
      this.errorMessage = 'Please fill all required fields';
      this.isSubmitting = false;
    }
  }

  private handleSuccess(response: any) {
    this.save.emit(response);

    // Proper form reset
    this.entryForm.reset({
      entryDate: new Date(),
      mood: Mood.Happy, // Set default mood
      title: '',
      content: ''
    });

    // Clear contenteditable div
    const editor = document.querySelector('.custom-editor');
    if (editor) editor.innerHTML = '';

    this.isSubmitting = false;
  }
  private handleError(error: any) {
    console.error('Error creating journal entry:', error);
    this.errorMessage = error.error?.message || 'Failed to save journal entry';
    this.isSubmitting = false;
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


  correctGrammar() {
    const editor = document.querySelector('.custom-editor') as HTMLElement;
    const currentText = editor?.innerText.trim();
    if (!currentText) {
      this.errorMessage = 'Editor content is empty.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    let result = '';

    this.journalService.correctGrammarStream(currentText)
      .subscribe({
        next: chunk => {
          result += chunk;
          editor.innerText = result;
          this.entryForm.patchValue({
            content: this.sanitizer.sanitize(SecurityContext.HTML, result)
          });
        },
        error: err => {
          console.error('Grammar correction failed', err);
          this.errorMessage = 'Failed to correct grammar.';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }



}
