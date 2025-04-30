import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/quizz/test';
import { TestServiceService } from 'src/app/Services/quizz/services/test-service.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  tests: Test[] = [];
  newTest: Test = new Test();

  constructor(private testService: TestServiceService) {}

  ngOnInit(): void {
    this.getTests();
  }

  getTests(): void {
    this.testService.getAllTests().subscribe(data => this.tests = data);
  }

  saveTest(): void {
    this.testService.saveTest(this.newTest).subscribe(() => {
      this.getTests();
      this.newTest = new Test();
    });
  }

  deleteTest(id: number): void {
    this.testService.deleteTest(id).subscribe(() => this.getTests());
  }

  editTest(test: Test): void {
    this.newTest = { ...test };
  }

  updateTest(): void {
    if (this.newTest.test_id) {
      this.testService.updateTest(this.newTest.test_id, this.newTest).subscribe(() => {
        this.getTests();
        this.newTest = new Test();
      });
    }
  }
}
