import { Component, OnInit } from '@angular/core';
import { Test } from '../../../model/test';
import { TestServiceService } from '../../../service/test-service.service';
@Component({
  selector: 'app-test-list',
  templateUrl:'./test-list.component.html',
  styleUrls: ['./test-list.component.css'] 
})
export class TestListComponent implements OnInit {
  tests: Test[] = [];
  router: any;
  constructor(private testService: TestServiceService) { }

  ngOnInit(): void {
    this.loadTests();
  }

  gotoTAkeTest(id:any){
    this.router.navigate(['/auth/taketest', id]);
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