import { IsArray } from "class-validator";


export class UserHistoryDto {
	@IsArray()
	urls: string[];
}