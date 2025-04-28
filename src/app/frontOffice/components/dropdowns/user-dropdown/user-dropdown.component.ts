import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { createPopper, Instance } from '@popperjs/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent implements AfterViewInit, OnDestroy {
  constructor(private userService: UserService) { }
  dropdownPopoverShow = false;
  private popperInstance: Instance | null = null;

  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false }) popoverDropdownRef!: ElementRef;

  ngAfterViewInit() {
    this.initializePopper();
  }

  ngOnDestroy() {
    this.destroyPopper();
  }

  toggleDropdown(event: MouseEvent): void {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;

    // Update popper position when toggled
    if (this.dropdownPopoverShow && this.popperInstance) {
      this.popperInstance.update();
    }
  }

  private initializePopper(): void {
    if (this.btnDropdownRef?.nativeElement && this.popoverDropdownRef?.nativeElement) {
      try {
        this.popperInstance = createPopper(
          this.btnDropdownRef.nativeElement,
          this.popoverDropdownRef.nativeElement,
          {
            placement: 'bottom-start',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8] // Optional: adds 8px spacing from the reference element
                }
              }
            ]
          }
        );
      } catch (error) {
        console.error('Error initializing popper:', error);
      }
    }
  }

  private destroyPopper(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }


  photourl: string = 'assets/images/default-avatar.png';  // default photo


  ngOnInit(): void {
    this.getuserPhoto();  // Correct async handling
  }

  getuserPhoto(): void {
    this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        // Use the avatarUrl from the user data or fallback to default photo if not available
        this.photourl = currentUser.avatarUrl || 'assets/img/white.png';
        console.log('Avatar URL:', this.photourl);  // You can log it to confirm the URL
      },
      error: (err) => {
        console.error('Failed to fetch current user photo', err);
        // Fallback to default image in case of error
        this.photourl = 'assets/img/white.png';
      }
    });
  }
















}
