import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { getNotes } from "../../Services/noteService";
import Button from "../General/Button";

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
        <div className="min-h-screen bg-gray-100 p-6">
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : !notes?.length ? (
                <p className="text-center text-gray-500">No notes found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:scale-[1.02] transition flex justify-between items-start"
                        >
                            <div className="w-[60%]">
                                <div className="mb-2">
                                    <p className="text-gray-500 text-sm">
                                        <span className="font-medium">
                                            {note.userName}
                                        </span>{" "}
                                        - {note.firstName} {note.lastName}
                                    </p>
                                </div>

                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {note.note_title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2 overflow-hidden">
                                    {note.note_content}
                                </p>
                            </div>

                            <div className="w-[40%] flex flex-col items-end space-y-2">
                                <p className="text-gray-400 text-xs text-right">
                                    Last updated:{" "}
                                    {new Date(
                                        note.note_updatedAt
                                    ).toLocaleString()}
                                </p>
                                <Link to={"/edit"}>
                                    <Button
                                        BtnText={"Edit"}
                                        className=" text-white "
                                    />
                                </Link>
                                <Link>
                                    <Button
                                        BtnText={"Delete"}
                                        className="bg-red-500 hover:bg-red-600 text-white "
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
