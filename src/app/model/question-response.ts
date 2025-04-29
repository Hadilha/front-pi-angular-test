import { Test } from "./test";

export class QuestionResponse {
    qr_id?: number;
    questionText: string;
    responseText: string;
    test:Test;

    constructor(data: any = {}){
        this.questionText = data.question_text || '';
        this.responseText = data.response_text || '';
        this.test = data.test;
    }
}
