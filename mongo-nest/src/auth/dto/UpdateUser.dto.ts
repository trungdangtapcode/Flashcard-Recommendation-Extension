import { IsNotEmpty } from "class-validator";
import { UserBioDto } from "./UserBio.dto";

export class UpdateUserDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	bio: UserBioDto;
}