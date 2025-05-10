import { useParams } from "react-router-dom";
import { useUserContext } from "../Components/Context/UserContext";

export default function NotePage({ note }) {
    const { channelId } = useParams();
    const { user } = useUserContext();
    console.log(note);

    return (
        <div className="max-w-[500px] p-3 h-[500px] mt-[10%] mx-auto border-[2px] shadow-2xl border-gray-300 rounded-lg">
            {user?.user_id !== channelId && (
                <div className="flex gap-3">
                    <img src={user?.user_avatar} alt="avatar" className="w-12 h-12"/>
                    <div>
                        <div>
                            {user?.user_firstName} {user?.lastName}
                        </div>
                        <div>{user?.user_name}</div>
                    </div>
                </div>
            )}
            <div className="border-b border-gray-400 pb-2">
                {note?.note_title}
            </div>
            <div className="h-full overflow-y-scroll">{note?.note_content}</div>
        </div>
    );
}
