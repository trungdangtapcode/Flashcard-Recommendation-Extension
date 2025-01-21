import { IsNotEmpty, IsOptional } from "class-validator";

export class FlashcardDto {
	@IsNotEmpty()
	question: string;
	@IsNotEmpty()
	answer: string;
	@IsOptional()
	confidence: number = 0; //[ClassA] <> ClassA[], check the schema
	// confidence: {
	// 	type: number,
	// 	default: 0,
	// };
}