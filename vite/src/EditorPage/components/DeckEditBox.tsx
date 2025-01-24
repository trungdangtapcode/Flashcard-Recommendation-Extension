import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IDeckEditBoxProps {
	name: string;
	description: string;
	onSave: (name: string, description: string) => void;
}
const DeckEditBox = ({name, description, onSave}: IDeckEditBoxProps) => {
	const [deckName, setDeckName] = useState(name);
	const [deckDescription, setDeckDescription] = useState(description);
	console.log(deckName, deckDescription);
	const navigate = useNavigate()
	return (
		<div className="h-full w-full bg-slate-200">
			<div className="h-2/3 flex flex-col">
				<input
					className="my-2 h-1/5"
					type="text"
					placeholder="Deck Name"
					value={deckName}
					onChange={(e)=>{setDeckName(e.target.value)}}
				/>
				<textarea
					className="my-2 h-3/5"
					placeholder="Deck Description"
					value={deckDescription}
					onChange={(e)=>{setDeckDescription(e.target.value)}}
				/>
			</div>
			<div className="h-1/3 flex justify-center items-center ">
				<button className="w-1/2 bg-gray-600 hover:bg-gray-400 h-full rounded-none"
				onClick={()=>{
					navigate("/deckhome");
				}}>
					Back
				</button>
				<button className="w-1/2 bg-gray-600 hover:bg-gray-400 h-full rounded-none"
				onClick={()=>{
					onSave(deckName, deckDescription);
				}}>
					Save
				</button>
			</div>
		</div>
	)
}

export default DeckEditBox;