interface IFlashcardItem {
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
    answer: string;
    options: string[];
    id: number;
}
interface ICategories { id: number; name: string }

interface IQuestionProps {
    word_id: number,
    question: string, 
    answers: string[], 
    correctId: number, 
    onNext: () => void
}
interface IQuestion {
    question: string;
    answers: string[];
    correct_id: number;
    word_id: number;
}