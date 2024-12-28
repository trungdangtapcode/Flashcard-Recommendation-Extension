import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { QueryService } from './query.service';
import { QuestionQueryDto } from "./dto/QuestionQuery.dto";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { Request } from 'express';

interface IJwdPayloadUserId {
    id: string, 
    iat: number,
    exp: number
}

@Controller('query')
export class QueryController {
	constructor(private QueryService: QueryService) {}

	@Post('question')
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtGuard)
	async queryQuestion(@Req() req: Request, @Body() QuestionQueryDto: QuestionQueryDto){
		const id = (req.user as IJwdPayloadUserId).id
		const result = await this.QueryService.queryQuestion(id, QuestionQueryDto);
		return result
	}
}