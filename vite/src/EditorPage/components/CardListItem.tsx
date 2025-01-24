import { FaTrash } from "react-icons/fa";
import "./CardListItem.scss"

interface ICardListItemProps {
	name: string;
	onClick: () => void;
	onDelete: (e : React.MouseEvent<HTMLButtonElement>) => void;
}

const CardListItem = ({ name, onClick, onDelete }: ICardListItemProps) => {
	return (
		<li className="list-item"
			onClick={onClick}>
			<span>{name}</span>
			<button onClick={onDelete}><FaTrash/></button>
		</li>
	)
}
export default CardListItem;