import { Component, OnInit } from '@angular/core';
import { QuestionResponseService } from '../../../Services/question-response.service';
import { QuestionResponse } from '../../../model/question-response';
import { TestServiceService } from '../../../Services/test-service.service';
import { Test } from '../../../model/test';

@Component({
  selector: 'app-question-response',
  templateUrl: './question-response.component.html',
  styleUrls: ['./question-response.component.css']
})
export class QuestionResponseComponent implements OnInit {
  responses: QuestionResponse[] = [];
  tests: Test[] = [];
  newResponse: QuestionResponse = new QuestionResponse();

  constructor(
    private responseService: QuestionResponseService,
    private testService: TestServiceService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.responseService.getAllQuestionResponses().subscribe(data => this.responses = data);
    this.testService.getAllTests().subscribe(data => this.tests = data);
  }

  save(): void {
    this.responseService.saveQuestionResponse(this.newResponse).subscribe(() => {
      this.getAll();
      this.newResponse = new QuestionResponse();
    });
  }

  edit(response: QuestionResponse): void {
    this.newResponse = { ...response };
  }

  update(): void {
    if (this.newResponse.qr_id) {
      this.responseService.updateQuestionResponse(this.newResponse.qr_id, this.newResponse)
        .subscribe(() => {
          this.getAll();
          this.newResponse = new QuestionResponse();
        });
    }
  }

  delete(id: number): void {
    this.responseService.deleteQuestionResponse(id).subscribe(() => this.getAll());
  }
}
