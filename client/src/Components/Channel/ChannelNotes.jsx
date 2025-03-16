import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { getNotes } from "../../Services/noteService";

export default function ChannelNotes() {
    const { user } = useUserContext();
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const response = await getNotes(user?.user_id);
                if (response && !response.message) {
                    setNotes(response);
                }
            } catch (error) {
                navigate("/error");
                setNotes(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    return (
        <div>
            {loading ? "Loading..." : !notes?.length ? "No notes Found" : notes}{" "}
        </div>
    );
}
