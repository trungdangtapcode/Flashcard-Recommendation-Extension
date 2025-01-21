import { IsNotEmpty, IsOptional } from "class-validator";
import { FlashcardDto } from "./Flashcard.dto";


export class DeckDto {
	@IsNotEmpty()
	name: string;
	@IsNotEmpty()
	description: string;
	@IsOptional()
	cards: FlashcardDto[] = [];

	@IsOptional()
	deckId: string;
}