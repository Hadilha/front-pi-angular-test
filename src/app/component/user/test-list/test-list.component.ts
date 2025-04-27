import { Component, OnInit } from '@angular/core';
import { Test } from '../../../model/test';
import { TestServiceService } from '../../../Services/test-service.service';

@Component({
  selector: 'app-test-list',
  template: `
    <div class="container mt-4">
      <h2>Tests List</h2>
      <div *ngIf="tests.length === 0" class="alert alert-info">
        No tests available
      </div>
      <ul class="list-group">
        <li *ngFor="let test of tests" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ test.name }}</span>
            <div>
              <button class="btn btn-sm btn-danger" (click)="navigate(test.test_id!)">Take test</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .list-group-item {
      margin-bottom: 8px;
      border-radius: 4px;
    }
  `]
})
export class TestListComponent implements OnInit {
  tests: Test[] = [];
  router: any;

  constructor(private testService: TestServiceService) { }

  ngOnInit(): void {
    this.loadTests();
  }

  navigate(id:any){
    this.router.navigate(['/patientspace/taketest', id]);
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(
      (tests: Test[]) => {
        this.tests = tests;
      },
      (error) => {
        console.error('Error loading tests:', error);
      }
    );
  }
}