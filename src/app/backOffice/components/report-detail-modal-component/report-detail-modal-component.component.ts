import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-detail-modal-component',
  templateUrl: './report-detail-modal-component.component.html',
  styleUrls: ['./report-detail-modal-component.component.css']
})
export class ReportDetailModalComponentComponent {
  @Input() report: any;

  @Output() closeModal = new EventEmitter<void>();
  @Output() reviewed = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ReportDetailModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Triggered when user clicks the close button
  close(): void {
    this.dialogRef.close();
  }

  // Triggered when user clicks "Mark as Reviewed"
  markAsReviewed(report: any) {
    this.reviewed.emit(report);
  }

  // Triggered when user clicks "Delete"
  deleteReportedContent(report: any) {
    this.deleted.emit(report);
  }
}
