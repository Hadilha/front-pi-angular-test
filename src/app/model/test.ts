import { QuestionResponse } from "./question-response";

export class Test {
    test_id?: number;
    name: string;
    question_response?: QuestionResponse[];

    constructor(data: any = {}) {
        this.name = data.name || '';
        this.question_response = data.question_response ? data.question_response.map((q: any) => new QuestionResponse(q)) : [];
    }
}
