import { IsNotEmpty } from "class-validator";


export class QueryQuestionDto {
    @IsNotEmpty()
    corpus: string;

    @IsNotEmpty()
    urls: string[];
    
    @IsNotEmpty()
    userId: string;
}

