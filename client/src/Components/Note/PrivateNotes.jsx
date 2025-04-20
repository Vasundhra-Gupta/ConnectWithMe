import { useState, useEffect } from "react";
import { getPrivateNotes, toggleVisibility } from "../../Services/noteService";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export default function PrivateNotes() {
    const { user } = useUserContext();
    const [privateNotes, setPrivateNotes] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getPrivateNotes(user?.user_id);
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

    const handleToggleVisibility = async (noteId) => {
        try {
            const res = await toggleVisibility(noteId);
            if (res && res.message === "note visibility toggled successfully") {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error.message);
            navigate("/error");
        }
    };

    const handleEdit = () => {};

    const handleDelete = () => {};

    const noteElements = privateNotes?.map((note) => (
        <div
            key={note.note_id}
            className="bg-white shadow-lg rounded-2xl p-5 mb-4 w-full transition-transform hover:scale-[1.02] relative"
        >
            {/* Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                    onClick={() => handleEdit(note)}
                    className="text-sm px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Edit
                </button>
                <Link
                    to={`/delete`}
                    className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                    Delete
                </Link>
                <button
                    onClick={() => handleToggleVisibility(note.note_id)}
                    className={`text-sm px-2 py-1 rounded ${
                        note.note_visibility === "Private"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                >
                    {note.note_visibility}
                </button>
                {/* <p className="text-gray-400 text-xs text-right">
                                    Last updated:{" "}
                                    {new Date(
                                        note.note_updatedAt
                                    ).toLocaleString()}
                                </p> */}
            </div>

            {/* Note Content */}
            <div className="pt-3 pr-24">
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
                : !privateNotes?.length
                ? "No notes Found"
                : noteElements}
        </div>
    );
}
