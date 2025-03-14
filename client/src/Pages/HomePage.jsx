import { useEffect, useState } from "react";
import { getNotes } from "../Services/noteService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

export default function HomePage() {
    const { user } = useUserContext();
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();
    const noteElements = notes?.map((note) => (
        <div key={note.note_id} className="bg-violet-200 rounded-lg my-2">
            <div>{note.note_title}</div>
            <div>{note.note_content}</div>
        </div>
    ));
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                console.log(user);

                const notes = await getNotes(user?.user_id);
                if (notes && !notes.message) {
                    setNotes(notes);
                }
            } catch (error) {
                setNotes(null);
                console.log(error);
                navigate("/error");
            } finally {
                setLoading(false);
            }
        })();
    }, [user]);
    return (
        <div className="flex justify-center items-center w-full h-full font-bold bg-red-700">
            {loading ? (
                "Loading..."
            ) : notes ? (
                 <div className="w-full">{noteElements} </div>
            ) : (
                <div className=" text-xl">No notes found</div>
            )}
        </div>
    );
}
