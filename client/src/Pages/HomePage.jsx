import { useEffect, useState } from "react";
import { getAllNotes } from "../Services/noteService";
import { useNavigate } from "react-router-dom";
import NoteCard from "../Components/Note/NoteCard";

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
        <NoteCard key={note?.note_id} note={note}/>
    ));

    return (
        <div className="flex flex-col items-center w-full min-h-screen px-6">
            {loading ? (
                <p className="text-lg font-semibold text-gray-700">
                    Loading...
                </p>
            ) : notes ? (
                <div>
                    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                        {noteElements}
                    </div>
                </div>
            ) : (
                <p className="text-xl text-gray-800">No notes found</p>
            )}
        </div>
    );
}
