import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarJournalComponent } from './sidebarJournal.component';

describe('SidebarComponent', () => {
  let component: SidebarJournalComponent;
  let fixture: ComponentFixture<SidebarJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarJournalComponent]
    });
    fixture = TestBed.createComponent(SidebarJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
