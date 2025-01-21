import { IsNotEmpty } from "class-validator";
import { UserBioDto } from "../../auth/dto/UserBio.dto";

export class UpdateUserDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	bio: UserBioDto;
}