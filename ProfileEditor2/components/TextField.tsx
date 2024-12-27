interface IProps{
    value: string
    onTextChange: (text: string) => void
}
const TextField = ({ value, onTextChange }: IProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={event => {
        console.log('Typed..', event.target.value)
        onTextChange(event.target.value)
      }}
    />
  )
}

export default TextField