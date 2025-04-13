import React, { useState } from "react";
import Button from "../General/Button";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../../Services/noteService";
import { useUserContext } from "../../Context/UserContext";

export default function DeleteNote({noteId,setNotes}) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await deleteNote(noteId);
            if (response && response.message == "note deleted succesfully") {
                setNotes(prev => prev.filter(note => note.note_id !== noteId));
                console.log(response.message);
                navigate(`channel/${user?.user_id}`);
            }
        } catch (error) {
            navigate("/error");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Button
                onClick={handleSubmit}
                className={"text-white"}
                BtnText={loading ? "Loading..." : "Delete"}
            />
        </div>
    );
}
