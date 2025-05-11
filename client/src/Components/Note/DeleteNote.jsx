
import React, { useState } from "react";
import Button from "../General/Button";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../../Services/noteService";
import { useUserContext } from "../Context/UserContext";

export default function DeleteNote({noteId, notes, setNotes}) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await deleteNote(noteId);
            if (response && response.message == "note deleted succesfully") {
                setNotes(notes.filter(note => note.note_id !== noteId));
            }
        } catch (error) {
            console.log(error.message)
            navigate("/error");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Button
                onClick={handleSubmit}
                className={"text-[#333] bg-inherit hover:bg-inherit"}
                BtnText={loading ? "Loading..." : "✂"}
            />
        </div>
    );
}
