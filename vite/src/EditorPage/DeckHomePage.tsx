import { useEffect, useState } from "react";
import DeckBox from "./components/deckBox";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useNavigate } from "react-router-dom";
import { FaBackward, FaPlus} from "react-icons/fa";

const DeckHomePage = ()=>{
	const [decks, setDecks] = useState<IDeck[]>([]);

	const url = import.meta.env.VITE_BACKEND_URL;
	const token = localStorage.getItem("token");
	const fetchDeckData = async () => {
		// const bodyString = ''
		const response = await fetch(url+'/account/status', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		if (!response.ok) {
			console.error('Failed to fetch desk data')
			return
		}
		const data = await response.json()
		setDecks(data.decks)
	}
	useEffect(()=>{
		fetchDeckData()
	}, []);
	const deleteDeckHandler = async (deckIdx: number) => {
		confirmAlert({
			title: "Delete confirm!",
			message: "Are you sure to do this deck?",
			buttons: [
				{
					label: "Yes",
					onClick: () => deleteDeck(deckIdx)
				},
				{
					label: "No",
					onClick: () => {}
				}
			]
		})
	}
	const deleteDeck = async (deckIdx: number) => {
		const len = decks.length;
		if (deckIdx >= len || deckIdx < 0) {
			toast.error('Invalid deck index')
			return
		}
		const newDecks = [...decks]
		newDecks.splice(deckIdx, 1)
		setDecks(newDecks)
		saveChangeToBackend(newDecks)
	}
	const navigate = useNavigate()
	const deckEditHandler = (deckIdx: number) => {
		navigate(`/deckedit/${deckIdx}`)
	}
	const saveChangeToBackend = async (newDecks: IDeck[]|undefined) => {
		const curDecks = newDecks || decks
		const url = import.meta.env.VITE_BACKEND_URL;
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error('Invalid token');
			return;
		}
		const response = await fetch(url+'/account/setDecks', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(curDecks)
		})
		if (!response.ok) {
			toast.error('Failed to update deck');
			return;
		}
		toast.success('Updated', {autoClose: 1000});
	}

	return (
		<div className="w-screen justify-items-center">
			<div className="deck-box"
			onClick={()=>{
				navigate('/card')
			}}>
				<div className="w-full flex justify-center">
					<FaBackward color="gray"/>
				</div>
			</div>
			<div className="deck-box"
			onClick={()=>{
				navigate('/deckcreate')
			}}>
				<div className="w-full flex justify-center">
					<FaPlus color="gray"/>
				</div>
			</div>
			{decks.map((deck: IDeck, index: number) => {
				return (
					<DeckBox key={deck.deckId} 
						name={deck.name + ` [${deck.cards?deck.cards.length:0}]`} 
						description={deck.description} 
						onDelete={()=>deleteDeckHandler(index)}
						onEdit={()=>deckEditHandler(index)}
					/>
				)}
			)}
		<ToastContainer/>
		</div>
	)
}

export default DeckHomePage