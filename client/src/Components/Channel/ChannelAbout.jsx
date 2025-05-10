import { useChannelContext } from "../Context/ChannelContext";

export default function ChannelAbout() {
  const { channel } = useChannelContext();

  if (!channel) return <p className="text-center mt-10 text-gray-500">Loading channel info...</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 m-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b pb-2">About the Channel</h2>
      <div className="space-y-3 text-lg text-gray-700">
        <p><span className="font-semibold text-gray-900">Channel:</span> @{channel.user_name}</p>
        <p><span className="font-semibold text-gray-900">Owner:</span> {channel.user_firstName} {channel.user_lastName}</p>
        <p><span className="font-semibold text-gray-900">Email:</span> {channel.user_email}</p>
        <p><span className="font-semibold text-gray-900">Bio:</span> {channel.user_bio || "No bio available."}</p>
      </div>
    </div>
  );
}
