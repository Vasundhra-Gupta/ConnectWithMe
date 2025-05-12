import { useMemo, useState } from "react";
import Button from "../General/Button";
import DeleteNote from "./DeleteNote";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useChannelContext } from "../Context/ChannelContext";
import EditNotePage from "../../Pages/EditNotePage";
import { useUserContext } from "../Context/UserContext";
import { toggleVisibility } from "../../Services/noteService";
import { NotePage } from "../../Pages";

export default function NoteCard({ note, setNotes , notes}) {
    const { channel } = useChannelContext();
    const { user } = useUserContext();
    const [editing, setEditing] = useState(false);
    const [showNote, setShowNote] = useState(false);

    //it ensured no rerendereing
    const isOwner = useMemo(
        () => user?.user_id === note?.note_ownerId,
        [user, note]
    );

    const navigate = useNavigate();
    const location = useLocation();

    const isProfilePage = location.pathname.startsWith("/channel");

    const handleToggleVisibility = async (noteId) => {
  try {
    const res = await toggleVisibility(noteId); // Returns { message: "..." }
    if (res.message === "note visibility toggled successfully") {
      // Manually toggle visibility in the frontend state
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.note_id === noteId 
            ? { ...note, note_visibility: !note.note_visibility } 
            : note
        )
      );
    }
  } catch (error) {
    console.error("Toggle failed:", error);
    navigate("/error");
  }
};

    if (!note) return null;

    return (
        <>
            <div
                className="bg-white shadow-lg rounded-2xl p-5 mb-3 w-full transition-transform hover:scale-[1.02] relative"
                onClick={() => !editing && setShowNote(true)}
            >
                {!isProfilePage && (
                    // user info
                    <Link to={`/channel/${note?.note_ownerId}`}>
                        <div className="flex items-center border-b pb-4 mb-4 border-gray-200 gap-4">
                            <img
                                src={note?.avatar}
                                alt="Avatar"
                                className="w-12 h-12 rounded-full border border-gray-300"
                            />
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">
                                    @{note?.userName}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {note?.firstName} {note?.lastName}
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                <div
                    className={`flex justify-between items-center ${
                        isProfilePage && "border-b border-gray-200 pb-2"
                    } `}
                >
                    <h2 className="text-xl font-bold text-blue-700">
                        {note?.note_title}
                    </h2>

                    {/* Controls only for owner on profile page */}
                    {isOwner &&
                        isProfilePage &&
                        (editing ? (
                            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                                <EditNotePage note={note} setNotes={setNotes} />
                            </div>
                        ) : (
                            <div className="flex gap-3 items-center">
                                {/* Edit Button */}
                                <Button
                                    BtnText="Edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditing(!editing);
                                    }}
                                    className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                                />

                                {/* Delete Button */}
                                <DeleteNote noteId={note?.note_id} />

                                {/* Visibility Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleVisibility(note?.note_id);
                                    }}
                                    className={`relative w-10 h-5 flex items-center rounded-full transition-colors duration-300 ${
                                        note?.note_visibility
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                    }`}
                                    aria-pressed={note?.note_visibility}
                                >
                                    <span
                                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                            note?.note_visibility
                                                ? "translate-x-5"
                                                : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                </div>

                {/* Note Content */}
                <div className="pt-2">
                    <p className="text-gray-700 mt-1 line-clamp-2">
                        {note?.note_content}
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
