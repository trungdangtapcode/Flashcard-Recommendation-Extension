import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { QueryService } from './query.service';
import { QuestionQueryDto } from "./dto/QuestionQuery.dto";

@Controller('query')
export class QueryController {
	constructor(private QueryService: QueryService) {}

	@Post('question')
	@UsePipes(new ValidationPipe())
	async queryQuestion(@Body() QuestionQueryDto: QuestionQueryDto){
		const result = await this.QueryService.queryQuestion(QuestionQueryDto);
		return result
	}
}