interface IProps{
    title: string;
    onButtonClick: () => void;
}

const Button = ({ title, onButtonClick }: IProps) => (
  // Short hand for event => onButtonClick()
  <button onClick={onButtonClick}>{title}</button>
)

export default Button