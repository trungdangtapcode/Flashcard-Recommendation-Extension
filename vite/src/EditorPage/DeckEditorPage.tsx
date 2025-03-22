import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyToken } from "../utils/auth";
import CardEditor from "./components/CardEditor";
import CardListItem from "./components/CardListItem";
import { toast, ToastContainer } from "react-toastify";
import "./components/CardListItem.scss"
import { FaPlus } from "react-icons/fa";
import DeckEditBox from "./components/DeckEditBox";

const DeckEditorPage = () => {
	const {deckIndex: deckIndexString} = useParams<{deckIndex: string}>();
	const deckIndex = parseInt(deckIndexString ?? '0');
	if (isNaN(deckIndex)) {
		throw new Error("Invalid deck index");
	}
	const [deck, setDeck] = useState<IDeck>();
	// let selectedCardIndex = -1;
	const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);
	const [question, setQuestion] = useState<string>("");
	const [answer, setAnswer] = useState<string>("");
	const [deckName, setDeckName] = useState<string>("");
	const [deckDescription, setDeckDescription] = useState<string>("");

	const changeSelectedCardIndex = (index: number) => {
		setSelectedCardIndex(index);
		if (index === -1) {
			setQuestion("");
			setAnswer("");
			return;
		}
		const len = deck==undefined?0:deck.cards.length;
		if (index>=len|| index<0) {
			console.error('Invalid card index');
			return;
		}

		if (deck && deck.cards) {
			const card = deck.cards[index];
			setQuestion(card.question);
			setAnswer(card.answer);
		}
	}

	const navigate = useNavigate();
	const getData = async () => {
		const callback = (data: { decks: any; }) => {
			const decks = data.decks;
			const len = decks.length;
			if (deckIndex >= len || deckIndex < 0) {
				console.error('Invalid deck index')
				return;
			}
			const curDeck = decks[deckIndex];
			setDeck(curDeck)
			setDeckName(curDeck.name)
			setDeckDescription(curDeck.description)
		}
		verifyToken(callback, navigate);
	}
	useEffect(()=>{
		getData()
	},[])
	const saveChangeToBackend = async () => {
		const url = import.meta.env.VITE_BACKEND_URL;
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error('Invalid token');
			return;
		}
		const response = await fetch(url+'/account/setDeck', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
				"ngrok-skip-browser-warning": "2705",
			},
			body: JSON.stringify(deck)
		})
		if (!response.ok) {
			toast.error('Failed to update deck');
			return;
		}
		toast.success('Updated', {autoClose: 500});
	}
	useEffect(()=>{
		if (deck){
			saveChangeToBackend();
		}
	},[deck])

	return (
		<div className="flex w-screen h-screen bg-black">
			<div className="w-1/3 h-full bg-slate-200 overflow-y-auto">
				<ul className="flex-col h-4/5">
					{deck?.cards?.map((card, index) => {
						return (
							<CardListItem
								key={index}
								name={card.question}
								onDelete={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation();
									const newDeck: IDeck | undefined = {...deck};
									if (newDeck?.cards) {
										newDeck.cards.splice(index, 1);
									}
									setDeck(newDeck);
									const len = newDeck?.cards?.length;
									if (len==0){
										changeSelectedCardIndex(-1);
									}
									else if (selectedCardIndex !== -1) {
										if (selectedCardIndex>=index) {
											changeSelectedCardIndex(selectedCardIndex-1);
										} else {
											changeSelectedCardIndex(selectedCardIndex);
										}
									}
								}}
								onClick={() => {
									changeSelectedCardIndex(index);
								}}
							/>
						);
					})}
				<li className="flex text-center items-center justify-around 
					w-full bg-slate-300 border-r-4 py-2
					hover:bg-slate-500"
				onClick={()=>{
					changeSelectedCardIndex(-1);
				}}>
					<FaPlus className="self-center"/>
				</li>
				</ul>
				<div className="w-full h-1/5 bg-black">
					<DeckEditBox
						deckName={deckName}
						setDeckName={setDeckName}
						deckDescription={deckDescription}
						setDeckDescription={setDeckDescription}
						onSave={(deskName: string, deskDesciption: string)=>{
							if (!deck) return;
							const newDeck = {...deck};
							newDeck.name = deskName;
							newDeck.description = deskDesciption;
							setDeck(newDeck);
						}}
					/>
				</div>
			</div>
			<div className="w-2/3 h-full bg-slate-200">
				<CardEditor 
					card = {selectedCardIndex==-1?
						{question: "", answer: "", confidence: 0}:
						deck?.cards[selectedCardIndex]
					}
					buttonLabel= {
						selectedCardIndex==-1?
						"Add":
						"Save"
					}
					onSave={(card)=>{
						if (card.question === "" || card.answer === "") {
							toast.error("Question and answer cannot be empty");
							return;
						}
						if (!deck) return;
						const newDeck = {...deck};
						if (selectedCardIndex === -1) {
							if (newDeck?.cards){
								newDeck.cards.push(card);
							} else if (newDeck) {
								newDeck.cards = [card];
							}
						} else {
							if (newDeck && newDeck.cards) {
								newDeck.cards[selectedCardIndex].question = card.question;
								newDeck.cards[selectedCardIndex].answer = card.answer;
							}
						}
						setDeck(newDeck);
					}}
					question={question}
					setQuestion={setQuestion}
					answer={answer}
					setAnswer={setAnswer}
				/>
			</div>
			<ToastContainer/>
		</div>
	)
}


export default DeckEditorPage;