import { Injectable } from "@nestjs/common";
import { QuestionQueryDto } from './dto/QuestionQuery.dto';


@Injectable()
export class QueryService {
	async queryQuestion(QuestionQueryDto: QuestionQueryDto){
		return QuestionQueryDto
	}
}