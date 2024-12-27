

const getFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`
}

interface IProps {
    user: IUser
    visible: boolean
}

const ShowProfile = ({ user, visible }: IProps) => {
  if (!visible) return null
  else {
    return (
      <div>
        <img src={user.profileImageURL} alt="" />
        <h2>{getFullName(user.firstName, user.lastName)}</h2>
      </div>
    )
  }
}

export default ShowProfile