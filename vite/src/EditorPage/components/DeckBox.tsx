import { useState } from "react";
import "./BoxComponent.scss";
import { FaTrash, FaEdit } from "react-icons/fa";

interface IDeckBoxProps {
	name: string;
	description: string;
	onDelete?: () => void;
	onEdit?: () => void;
}

const DeckBox = ({ name, description, onDelete = () => {}, onEdit = () => {}}: IDeckBoxProps) => {
  	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
		className="deck-box"
		onMouseEnter={() => setIsHovered(true)}
		onMouseLeave={() => setIsHovered(false)}
		>
		<h3 className="box-name">{name}</h3>
		{isHovered && <p className="box-description">{description}</p>}
		<div className="box-actions">
			<button className="action-button delete-button" onClick={onDelete}>
			<FaTrash />
			</button>
			<button className="action-button edit-button" onClick={onEdit}>
			<FaEdit />
			</button>
		</div>
		</div>
  	);
};

export default DeckBox;
