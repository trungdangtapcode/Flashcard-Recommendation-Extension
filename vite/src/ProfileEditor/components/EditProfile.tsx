import TextField from './TextField'

interface IProps {
    user: IUser
    onChangeFirstName: (text: string) => void
    onChangeLastName: (text: string) => void
    onChangeImageUrl: (text: string) => void
    visible: boolean
    }

const EditProfile = ({
  user,
  onChangeFirstName,
  onChangeLastName,
  onChangeImageUrl,
  visible
}: IProps) => {
  if (!visible) return null
  else {
    return (
      <div>
        <label>
          First name:{' '}
          <TextField
            value={user.firstName}
            onTextChange={onChangeFirstName} // Short hand for (value) => onChangeFirstName(value)
          />
        </label>
        <br />
        <label>
          Last name:{' '}
          <TextField
            value={user.lastName}
            onTextChange={onChangeLastName} // Short hand for (value) => onChangeLastName(value)
          />
        </label>
        <br />
        <label>
          Image URL:{' '}
          <TextField
            value={user.profileImageURL}
            onTextChange={onChangeImageUrl} // Short hand for (value) => onChangeImageUrl(value)
          />
        </label>
      </div>
    )
  }
}

export default EditProfile