export class AiModel {
    model= "llama2" ;
    prompt: string | undefined;
}

export class AiModelR {
    model: "llama2" | undefined;
    created_at: string | undefined;
    response?: string;
    done?: false
}