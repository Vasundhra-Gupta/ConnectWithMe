import React from "react";
import { getPublicNotes } from "../../Services/noteService";
import { useState, useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";

export default function PublicNotes() {
    const { user } = useUserContext();
    const [publicNotes, setPublicNotes] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getPublicNotes(user?.user_id);
                console.log(response);
                if (response && !response.message) {
                    setPublicNotes(response);
                }
            } catch (error) {
                setPublicNotes(null);
                console.log(error.message);
                navigate("/error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const noteElements = publicNotes?.map((note) => (
        <div
            key={note.note_id}
            className="bg-white shadow-lg rounded-2xl p-5 w-full transition-transform hover:scale-[1.02]"
        >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={note.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                    <Link to={`/channel/${note.note_ownerId}`}>
                        <p className="font-semibold text-gray-800 text-lg">
                            @{note.userName}
                        </p>
                    </Link>
                    <p className="text-gray-500 text-sm">
                        {note.firstName} {note.lastName}
                    </p>
                </div>
            </div>

            {/* Note Content */}
            <div className="border-t border-gray-200 pt-3">
                <h2 className="text-xl font-bold text-blue-700">
                    {note.note_title}
                </h2>
                <p className="text-gray-600 mt-1 line-clamp-2 overflow-hidden">
                    {note.note_content}
                </p>
            </div>
        </div>
    ));
    return (
        <div className="my-4">
            {loading
                ? "Loading..."
                : !publicNotes?.length
                ? "No notes Found"
                : noteElements}
        </div>
    );
}
