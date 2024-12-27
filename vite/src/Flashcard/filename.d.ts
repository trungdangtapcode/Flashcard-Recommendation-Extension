interface IFlashcardItem {
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
    answer: string;
    options: string[];
    id: number;
}
interface ICategories { id: number; name: string }