import { UserBioDto } from "@/auth/dto/UserBio.dto";
import { IsOptional } from "class-validator";



export class QuestionQueryDto {
	@IsOptional()
	corpus: string; // or sentence

	@IsOptional()
	historyUrls: string[];

	@IsOptional()
	bio: UserBioDto;

	@IsOptional()
	confScores: {
		word_id: number
		score: number
	}[]
}
