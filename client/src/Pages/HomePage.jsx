import { useEffect, useState } from "react";
import { getAllNotes } from "../Services/noteService";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getAllNotes();
                console.log(response);
                if (response && !response.message) {
                    setNotes(response);
                }
            } catch (error) {
                setNotes(null);
                console.log(error.message);
                navigate("/error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const noteElements = notes?.map((note) => (
        <div key={note.note_id} className="bg-white shadow-lg rounded-2xl p-5 my-4 w-full transition-transform hover:scale-[1.02]">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
                <img src={note.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-gray-300" />
                <div>
                    <p className="font-semibold text-gray-800 text-lg">{note.userName}</p>
                    <p className="text-gray-500 text-sm">{note.firstName} {note.lastName}</p>
                </div>
            </div>

            {/* Note Content */}
            <div className="border-t border-gray-200 pt-3">
                <h2 className="text-xl font-bold text-blue-700">{note.note_title}</h2>
                <p className="text-gray-600 mt-1 line-clamp-2 overflow-hidden">{note.note_content}</p>
            </div>
        </div>
    ));

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-white to-blue-50 p-5">
            {loading ? (
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            ) : notes ? (
                <div className="w-full grid grid-cols-2 gap-x-4">{noteElements}</div>
            ) : (
                <p className="text-xl text-gray-800">No notes found</p>
            )}
        </div>
    );
}
