interface IDeck{
	name: string;
	description: string;
	cards: ICrad[];
	deckId: string;
}

interface ICard{
	question: string;
	answer: string;
	confidence: string;
}