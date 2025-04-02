import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { createPopper } from '@popperjs/core'; // Fixed import name

@Component({
  selector: 'app-table-dropdown',
  templateUrl: './table-dropdown.component.html',
})
export class TableDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;

  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false }) popoverDropdownRef!: ElementRef;

  ngAfterViewInit() {
    this.initializePopper();
  }

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  private initializePopper() {
    if (this.btnDropdownRef?.nativeElement && this.popoverDropdownRef?.nativeElement) {
      try {
        createPopper(
          this.btnDropdownRef.nativeElement,
          this.popoverDropdownRef.nativeElement,
          {
            placement: 'bottom-start'
          }
        );
      } catch (error) {
        console.error('Error initializing popper:', error);
      }
    }
  }
}
