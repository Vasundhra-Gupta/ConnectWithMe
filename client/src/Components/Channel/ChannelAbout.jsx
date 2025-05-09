import { useUserContext } from "../Context/UserContext"

export default function ChannelAbout() {
  const {user} = useUserContext()

  return (
    <div className="font-semibold flex flex-col gap-4 justify-center items-start m-6">
      <div>Channel: {user.user_name}</div>
      <div>Owner: {user.user_firstName}{user.user_lastName}</div>
      <div>Email: {user.user_email}</div>
      <div>Bio: {user.user_bio}</div>
    </div>
  )
}
