import "./CardEditor.scss";

interface ICardEditorProps {
	card: ICard;
	buttonLabel: string;
	onSave: (card: ICard) => void;
	question: string;
	setQuestion: (question: string) => void;
	answer: string;
	setAnswer: (answer: string) => void;
}

const CardEditor = ({card, buttonLabel, onSave,
	question, setQuestion, answer, setAnswer
}: ICardEditorProps) => {
	const clearHandler = () => {
		setQuestion("");
		setAnswer("");
	}
	return (
		<div className="form-container">
			<textarea
				className = "question-input"
				placeholder="Enter the question"
				value={question}
				onChange={(e)=>{setQuestion(e.target.value);}}
				required
			/>
			<textarea
				className = "answer-input"
				placeholder="Enter the answer"
				value={answer}
				onChange={(e)=>{setAnswer(e.target.value);}}
				required
			/>
			<div className = "button-container">
				<button className="clear-button" onClick={clearHandler}>
					Clear
				</button>
				<button className="submit-button" onClick={()=>{
					card.question = question;
					card.answer = answer;
					onSave(card)
				}}>
					{buttonLabel}
				</button>
			</div>
		</div>
	)
}


export default CardEditor;