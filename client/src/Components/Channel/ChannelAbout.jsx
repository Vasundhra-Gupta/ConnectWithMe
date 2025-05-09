import { useChannelContext } from "../Context/ChannelContext";
export default function ChannelAbout() {
  const {channel} = useChannelContext();
  return (
    <div className="font-semibold flex flex-col gap-4 justify-center items-start m-6">
      <div>Channel: {channel?.user_name}</div>
      <div>Owner: {channel?.user_firstName}{channel?.user_lastName}</div>
      <div>Email: {channel?.user_email}</div>
      <div>Bio: {channel?.user_bio}</div>
    </div>
  )
}
