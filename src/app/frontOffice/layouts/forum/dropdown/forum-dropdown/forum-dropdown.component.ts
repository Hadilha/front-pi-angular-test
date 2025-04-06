// forum-dropdown.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-post-dropdown',
  templateUrl: './forum-dropdown.component.html',
})
export class ForumDropdownComponent {
  dropdownPopoverShow = false;

  

  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false }) popoverDropdownRef!: ElementRef;

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
    if (this.dropdownPopoverShow) {
      this.createPopper();
    }
  }

  private createPopper() {
    if (this.btnDropdownRef?.nativeElement && this.popoverDropdownRef?.nativeElement) {
      createPopper(
        this.btnDropdownRef.nativeElement,
        this.popoverDropdownRef.nativeElement,
        {
          placement: 'bottom-end',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8], // [skidding, distance]
              },
            },
          ],
        }
      );
    }
  }

  // Close dropdown when clicking outside
  onClickOutside(event: Event) {
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    }
  }
}