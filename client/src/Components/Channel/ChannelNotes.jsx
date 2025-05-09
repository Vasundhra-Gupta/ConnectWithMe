import { useParams } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import AddNote from "../Note/AddNote";
import PrivateNotes from "../Note/PrivateNotes";
import PublicNotes from "../Note/PublicNotes";
import { useState } from "react";

export default function ChannelNotes() {
    const { user } = useUserContext();
    const { channelId } = useParams();
    const [selectedType, setSelectedType] = useState("private");
    const [showAddNote, setShowAddNote] = useState(false);
    return (
        <>
            {user?.user_id == channelId ? (
                <div className="relative mx-6">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border-gray-800 border-2 rounded-lg mx-4 py-1 text-lg outline-none"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    {selectedType === "public" ? (
                        <PublicNotes />
                    ) : (
                        <div className="min-h-screen bg-gray-100 px-4">
                            <p
                                onClick={() => setShowAddNote(!showAddNote)}
                                className="absolute pr-5 text-2xl -top-12 right-0 "
                            >
                                {showAddNote ? "-" : "+"}
                            </p>
                            {showAddNote && <AddNote />}
                            <PrivateNotes />
                        </div>
                    )}
                </div>
            ) : (
                <PublicNotes />
            )}
        </>
    );
}
