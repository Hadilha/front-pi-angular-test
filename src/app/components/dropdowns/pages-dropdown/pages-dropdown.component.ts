import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-pages-dropdown',
  templateUrl: './pages-dropdown.component.html',
})
export class PagesDropdownComponent implements OnInit {
  dropdownPopoverShow = false;

  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false }) popoverDropdownRef!: ElementRef;

  ngOnInit() {
    // Initialization code if needed
  }

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPopper();
    }
  }

  createPopper() {
    if (this.btnDropdownRef && this.popoverDropdownRef) {
      createPopper(
        this.btnDropdownRef.nativeElement,
        this.popoverDropdownRef.nativeElement,
        {
          placement: 'bottom-start',
        }
      );
    }
  }
}
