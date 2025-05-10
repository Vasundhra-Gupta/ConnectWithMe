import React from "react";
import { getPublicNotes } from "../../Services/noteService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import NoteCard from "./NoteCard";

export default function PublicNotes() {
    const { user } = useUserContext();
    const { channelId } = useParams();
    const [publicNotes, setPublicNotes] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getPublicNotes(channelId);
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

    const noteElements = publicNotes?.map((note) => <NoteCard note={note} />);
    return (
        <div className="my-4">
            {loading ? (
                "Loading..."
            ) : !publicNotes?.length ? (
                "No notes Found"
            ) : (
                <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
                    {noteElements}
                </div>
            )}
        </div>
    );
}
