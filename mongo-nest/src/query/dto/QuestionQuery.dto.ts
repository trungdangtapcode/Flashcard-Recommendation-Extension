import { UserBioDto } from "@/auth/dto/UserBio.dto";
import { IsNotEmpty, IsOptional } from "class-validator";


export class QuestionQueryDto {
	@IsNotEmpty()
	corpus: string; // or sentence

	@IsOptional()
	historyUrls: string[];

	@IsNotEmpty()
	bio: UserBioDto;
}