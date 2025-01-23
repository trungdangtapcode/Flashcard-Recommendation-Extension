import { useEffect, useState } from "react";
import DeckBox from "./components/deckBox";
import { toast, ToastContainer } from "react-toastify";


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

	const deleteDeck = async (deckIdx: number) => {
		const len = decks.length;
		if (deckIdx >= len || deckIdx < 0) {
			toast.error('Invalid deck index')
			return
		}
		const newDecks = [...decks]
		newDecks.splice(deckIdx, 1)
		setDecks(newDecks)
	}

	return (
		<div className="w-screen justify-items-center">
			{decks.map((deck: IDeck, index: number) => {
				return (
					<DeckBox key={deck.deckId} 
						name={deck.name} 
						description={deck.description} 
						onDelete={()=>deleteDeck(index)}
					/>
				)}
			)}
		<ToastContainer/>
		</div>
	)
}

export default DeckHomePage