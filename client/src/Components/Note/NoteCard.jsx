import { useState } from "react";
import Button from "../General/Button";
import DeleteNote from "./DeleteNote";
import { Link, useLocation } from "react-router-dom";
import { useChannelContext } from "../Context/ChannelContext";
import { useUserContext } from "../Context/UserContext";
import { NotePage } from "../../Pages";

export default function NoteCard({ note }) {
    const { channel } = useChannelContext();
    const { user } = useUserContext();
    const location = useLocation();
    const [editing, setEditing] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const isProfilePage = location.pathname.includes("/channel");

    const handleToggleVisibility = async (noteId) => {
        try {
            const res = await toggleVisibility(noteId);
            if (res && res.message === "note visibility toggled successfully") {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error.message);
            navigate("/error");
        }
    };

    const handleEdit = () => {};

    return (
        <>
            <div
                className="bg-white shadow-lg rounded-2xl p-5 mb-3 w-full transition-transform hover:scale-[1.02] relative"
                onClick={() => setShowNote(true)}
            >
                {!isProfilePage && channel?.user_id !== user?.user_id && (
                    // user info
                    <Link to={`/channel/${note.note_ownerId}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={note.avatar}
                                alt="Avatar"
                                className="w-12 h-12 rounded-full border border-gray-300"
                            />
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">
                                    @{note.userName}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {note.firstName} {note.lastName}
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Buttons */}
                {channel?.user_id === user?.user_id && (
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {editing ? (
                            <EditNotePage
                                noteId={note?.note_id}
                                setNotes={setPrivateNotes}
                            />
                        ) : (
                            <Button
                                BtnText={"Edit"}
                                onClick={() => setEditing(!editing)}
                                className="text-sm px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                            />
                        )}
                        <DeleteNote noteId={note.note_id} />

                        <button
                            onClick={() => handleToggleVisibility(note.note_id)}
                            className={`text-sm px-2 py-1 rounded ${
                                note.note_visibility === "Private"
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-green-500 hover:bg-green-600"
                            } text-white`}
                        >
                            {note.note_visibility}
                        </button>
                    </div>
                )}

                {/* Note Content */}
                <div className="pt-3 pr-24">
                    <h2 className="text-xl font-bold text-blue-700">
                        {note.note_title}
                    </h2>
                    <p className="text-gray-600 mt-1 line-clamp-2 overflow-hidden">
                        {note.note_content}
                    </p>
                </div>
            </div>
            {showNote && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                    <NotePage note={note} onClose={() => setShowNote(false)} />
                </div>
            )}
        </>
    );
}
