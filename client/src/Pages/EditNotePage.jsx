import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/General/Button.jsx";
import { editNote } from "../Services/noteService.js";
import { useUserContext } from "../Components/Context/UserContext.jsx";

export default function EditNotePage({ note, setNotes }) {
    const { user } = useUserContext();
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        title: note?.note_title || "",
        content: note?.note_content || "",
        category: note?.note_category || "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMouseOver = () => {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && key != "category"
            ) ||
            error
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setDisabled(true);
            setError(null);
            const res = await editNote(inputs, note?.note_id);
            if (res && res.message === "note edited successfully") {
                setNotes((prev) =>
                    prev.map((n) => (n.note_id === note.note_id ? res : n))
                );
                navigate(`/channel/${user?.user_id}`);
            } else {
                setNotes(null);
                setError(res.message);
            }
        } catch (err) {
            console.log("server error", err);
            navigate("/error");
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };

    // const inputFields = [
    //     {
    //         type: "text",
    //         name: "title",
    //         id: "title",
    //         required: true,
    //         label: "Title",
    //     },
    //     {
    //         type: "text",
    //         name: "content",
    //         id: "content",
    //         required: true,
    //         label: "Content",
    //     },
    //     {
    //         type: "text",
    //         name: "category",
    //         id: "category",
    //         label: "Category",
    //     },
    // ];

    // const inputElements = inputFields.map((field) => (
    //     <div key={field.name}>
    //         <div>
    //             <label htmlFor={field.name}>{field.label}</label>
    //         </div>
    //         <div>
    //             <input
    //                 type={field.type}
    //                 name={field.name}
    //                 id={field.id}
    //                 required={field.required}
    //                 onChange={handleChange}
    //                 className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
    //             />
    //         </div>
    //     </div>
    // ));

    return (
        <div className=" bg-white px-4 py-2">
            <form className="shadow-lg rounded-lg " onSubmit={handleSubmit}>
                {error && (
                    <div className="text-red-500 text-sm mb-2 text-center">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    name="title"
                    value={inputs?.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border-b border-gray-400 outline-none text-lg mb-4"
                />

                <textarea
                    name="content"
                    value={inputs?.content}
                    onChange={handleChange}
                    placeholder="Write your insights"
                    className="w-full rounded-lg outline-none"
                />
                <Button
                    type="submit"
                    onMouseOver={handleMouseOver}
                    disabled={disabled}
                    className="rounded-full bg-violet-500 text-white px-4 py-2 hover:bg-violet-600"
                    BtnText={loading ? "Editing..." : "Edit"}
                />
            </form>
        </div>
    );
}
