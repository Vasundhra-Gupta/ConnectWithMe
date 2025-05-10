import { useState, useEffect } from "react";
import { getPrivateNotes, toggleVisibility } from "../../Services/noteService";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import NoteCard from "./NoteCard";

export default function PrivateNotes() {
    const { user } = useUserContext();
    const [privateNotes, setPrivateNotes] = useState();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getPrivateNotes();
                console.log(response);
                if (response && !response.message) {
                    setPrivateNotes(response);
                }
            } catch (error) {
                setPrivateNotes(null);
                console.log(error.message);
                navigate("/error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const noteElements = privateNotes?.map((note, index) => (
        <NoteCard
          key={note.note_id || `${note.note_title}-${index}`}
          note={note}
          setNotes={setPrivateNotes}
        />
      ))
      

    return (
        <div className="my-4">
            {loading ? (
                "Loading..."
            ) : !privateNotes?.length ? (
                "No notes Found"
            ) : (
                <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
                    {noteElements}
                </div>
            )}
        </div>
    );
}
