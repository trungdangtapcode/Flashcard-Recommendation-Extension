import { IsNotEmpty } from "class-validator";
import { FlashcardDto } from "./Flashcard.dto";

export class AddFlashcardDto{
	@IsNotEmpty()
	flashcard: FlashcardDto;
	@IsNotEmpty()
	deckId: string;
}